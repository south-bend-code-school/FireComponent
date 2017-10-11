<template>
  <div class="image-editor" ref="root">
    <slot name="display" :src="imageLocation">
      <div class="fire-image" :class="{'edit-container': editable}">
        <div class="ratio-enforcer" :style="{ paddingTop: padding*100+'%'}"></div>
        <div class="content" :style="{ backgroundImage: 'url('+imageLocation+')'}"></div>
      </div>
    </slot>
    <template v-if="editable">
      <label :for="uniqueName" title="Click to upload new image"></label>
      <input type="file" :id="uniqueName" @change="imageUploaded">
    </template>
    <div ref='editor' v-if="newUpload" class="fullscreen">
      <template v-if="!uploading">
        <slot name="croppie-header">
          <h1 class="header">Crop Photo</h1>
        </slot>
        <div class="croppie-wrapper">
          <div ref="croppie"></div>
        </div>
        <slot name="croppie-controls" :rLeft="rotateLeft" :rRight="rotateRight" :cancel="cancelCropping" :upload="confirmUpload">
          <button @click="rotateLeft">Rotate Left</button>
          <button @click="rotateRight">Rotate Right</button>
          <button @click="cancelCropping">Cancel</button>
          <button @click="confirmUpload">Complete</button>
        </slot>
      </template>
      <template v-else>
        <slot name="uploading" :cancel="cancelUpload" :noWait="noWait">
          <button @click="cancelUpload">Cancel Upload</button>
          <button @click="noWait">Continue Without Waiting</button>
        </slot>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import url('//cdnjs.cloudflare.com/ajax/libs/croppie/2.5.0/croppie.min.css');

  .edit-container {
    border: 2px dashed black;
  }

  .header {
    text-align: center;
  }

  .image-editor {
    position: relative;

    > label {
      position: absolute;
      cursor: pointer;
      z-index: 1;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
    > input {
      display: none;
    }
  }

  .fire-image {
    width: 100%;
    position: relative;
    display: block;
    > .ratio-enforcer {
      display: block;
      height: 0;
      width: 100%;
      padding-top: 100%;
    }

    > .content {
      position: absolute;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-color: black;
      color: white;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }

  .fullscreen {
    background-color: white;
    z-index: 2000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: scroll;
  }
</style>

<script>
import Croppie from 'croppie'

import Vue from 'vue'
import * as _ from 'lodash'

export default {
  name: 'fire-image',
  props: {
    storageRef: {
      type: [Object,String],
      default: () => null
    },
    editable: {
      type: [Boolean],
      default: () => false
    },
    aspectRatio: {
      type: [Number],
      default: () => 1.0
    },
    widths: {
      type: [Array],
      default: () => [320,500]
    },
    quality: {
      type: [Number],
      default: () => 1.0
    },
    circle: {
      type: [Boolean],
      default: () => false
    },
    enforceBoundary: {
      type: [Boolean],
      default: () => true
    },
    allowRotations: {
      type: [Boolean],
      default: () => true
    }
  },

  data () {
    return {
      uploadedImage: null,
      croppieInstance: null,
      croppedImage: null,
      newUpload: false,
      uploading: false,
      uploadTasks: [],
      imageLocation: null
    }
  },

  mounted () {
    if(this._storageRef) {
      this.loadFromStorage(this._storageRef)
    }

    console.log(this.$refs.editor)
    this.$nextTick(() => {
      document.getElementsByTagName('body')[0].appendChild(this.$refs.editor)
    })
  },

  computed: {
    /**
     * A unique id for this fire-image component
     */
    uniqueName () {
      return Math.random().toString(36).substring(4)
    },
    width () {
      return this.$el && this.$el.clientWidth ? this.$el.clientWidth : null
    },
    height () {
      return this.width / this.aspectRatio
    },
    padding () {
      return 1/this.aspectRatio
    },
    format () {
      if (this.quality < 1) {
        return 'jpeg'
      }
      return 'png'
    },
    _storageRef () {
      if(this.storageRef) {
        try {
          return _.isString(this.storageRef) ? this.$firebase.storage().ref(this.storageRef) : this.$firebase.storage().refFromURL(this.storageRef.toString())
        } catch (e) {
          console.error(e)
          return null
        }
      }
    },
  },

  watch: {
    _storageRef (val) {
      if(val) {
        this.loadFromStorage(val)
      }
    }
  },

  methods: {
    loadFromStorage (ref) {
      ref = ref.child(''+this.getIndexToDisplay())
      ref.getDownloadURL().then((url) => {
        if(ref.parent.toString() !== this._storageRef.toString()){return;}
        this.imageLocation = url
      },() => {
        console.error('No Image at specified location.')
      })
    },
    getIndexToDisplay () {
      var min = {
        index: 0,
        width: null
      }
      this.widths.forEach((width, i) => {
        if(min.width === null || width < min.width) {
          min = {
            index: i,
            width: width
          }
        }
      })
      return min.index
    },
    rotateRight () {
      this.croppieInstance.rotate(90)
    },
    rotateLeft () {
      this.croppieInstance.rotate(-90)
    },
    cancelCropping () {
      this.croppieInstance.destroy()
      this.croppieInstance = null
      this.newUpload = false
      this.uploadedImage = null
    },
    confirmUpload () {
      this.uploading = true

      return this.getCroppedResults()
        .then(this.uploadToStorage)
        .then((urls) => {
          this.uploading = false
          this.$emit('uploaded',urls)
          this.loadFromStorage(this._storageRef)
        })
        .then(this.cancelCropping)
        .catch((err) => {
          if(!this.newUpload) {
            this.cancelCropping()
          }
          this.onError(err)
        })
    },

    getCroppedResults () {
      const instance = this

      return Promise.all(
        this.widths.map((width) => {
          return this.croppieInstance.result({
            type: 'blob',
            size: { width: width, height: w/this.aspectRatio },
            format: (this.circle) ? 'png' : 'jpeg', // allow transparency for circular images
            circle: this.circle,
            quality: this.quality
          })
        })
      )
    },

    uploadToStorage (imageData) {
      this.uploadTasks = imageData.map((image,i) => {
        return this._storageRef.child(''+i).put(image)
      })

      return Promise.all(this.uploadTasks)
        .then(snapshotArray => {
          return snapshotArray.map((snapshot) => {
            snapshot.downloadURL
          })
        })
    },

    noWait () {
      this.newUpload = false
    },

    cancelUpload () {
      if(this.uploadTasks) {
        this.uploadTasks.forEach((task) => {
          task.cancel()
        })
        this.uploadTasks = []
        this.uploading = false
      }
    },

    onError (err) {
      console.error(err)
    },

    imageUploaded (e) {
      var instance = this
      var files = e.target.files

      if (!files.length) {
        alert('No image found in upload')
        return
      }

      this.uploadedImage = window.URL.createObjectURL(files[0])
      this.newUpload = true

      const iWidth = this.$refs.root.clientWidth
      const iHeight = iWidth / this.aspectRatio
      const oWidth = iWidth * 1.1 > window.innerWidth ? window.innerWidth : iWidth * 1.1
      const oHeight = iHeight * 1.1 > window.innerHeight ? window.innerHeight : iHeight * 1.1

      this.$nextTick(() => {
        instance.croppieInstance = new Croppie(instance.$refs.croppie, {
          enforceBoundary: instance.enforceBoundary,
          enableOrientation: instance.allowRotations,
          viewport: {
            width: iWidth,
            height: iHeight,
            type: (instance.circle) ? 'circle' : 'square'
          },
          boundary: {
            width: oWidth,
            height: oHeight
          }
        })
        instance.croppieInstance.bind({
          url: this.uploadedImage
        })
      })
    }
  },

}
</script>
