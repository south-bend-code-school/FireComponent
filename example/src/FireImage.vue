<template>
  <div class="image-editor">

    <template v-if="editable">

      <!-- User has uploaded an image -->
      <template v-if="uploadedImage">
        <div class="fullscreen valign-wrapper">

          <!-- Image is being processed -->
          <template v-if="isLoading">
            <div class="preloader-wrapper inner-valign-centered active">
              <div class="spinner-layer spinner-blue">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
        
              <div class="spinner-layer spinner-red">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
        
              <div class="spinner-layer spinner-yellow">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
        
              <div class="spinner-layer spinner-green">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </template>

          <!-- Image uploaded, needs editing-->
          <template v-else>
            <div class="inner-valign-centered">
              <div class="row">
                <img class="responsive-img" :src="uploadedImage" ref="image">
              </div>
              <div class="row center" v-if="allowRotations">
                <button class="btn" @click="rotate"><i class="material-icons">rotate_right</i></button>
              </div>
              <div class="row center">
                <button class="btn red lighten-2" @click="cancelUpload">Cancel</button>
                <button class="btn green lighten-2" @click="confirmUpload" style="margin-left: 30px">Continue</button>
              </div>
            </div>
          </template>
        </div>
      </template>

      <!-- Editable, but no image has been uploaded yet -->
      <template v-else>
        <label for="file-upload">
          <img class="responsive-img" :src="imageFromRef">
        </label>
        <input id="file-upload" type="file" @change="imageUploaded" style="display: none"/>
      </template>

    </template>

    <!-- Not Editable -->
    <template v-else>
      <progressive-img
        v-if="imageFromRef.length"
        :src="imageFromRef"
        :placeholder="thumbnailImage"
        :blur="30"
      /> 
      <div style="width: 100%; height: 200px;" class="grey lighten-2" v-else></div>
    </template>

  </div>
</template>

<style scoped>
  @import '//cdnjs.cloudflare.com/ajax/libs/croppie/2.5.0/croppie.min.css';
  @import '//cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/css/materialize.min.css';
  @import '//fonts.googleapis.com/icon?family=Material+Icons';

  label[for="file-upload"]  img {
    padding: 5px;
    border: 1px dashed #202020;
  }

  .inner-valign-centered {
    margin-left: auto;
    margin-right: auto;
  }

  .fullscreen {
    background-color: white;
    z-index: 2000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

<script>
import Croppie from 'croppie'

import Vue from 'vue'
import VueProgressiveImage from 'vue-progressive-image'
Vue.use(VueProgressiveImage)

export default {
  name: 'fire-image',
  props: {
    storageRef: {
      type: [Object],
      default: () => null
    },
    firebaseReference: {
      type: [Object],
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
      isLoading: false,
      thumbnailImage: '',
      imageFromRef: '',
      uploadedImage: null,
      croppieInstance: null,
      croppedImage: null
    }
  },

  mounted (evt) {
    if (this.firebaseReference === null) {
      const thumbnailPromise = this.storageRef.child('thumbnail')
        .getDownloadURL()

      const fullSizePromise = this.storageRef.child('fullsize')
        .getDownloadURL()

      return Promise.all([thumbnailPromise, fullSizePromise])
        .then(imageRefs => {
          this.thumbnailImage = imageRefs[0]
          this.imageFromRef = imageRefs[1]
        })
        .catch(this.setDefaultImages)
    } else {
      this.firebaseReference.on('value', snapshot => {
        const data = snapshot.val()

        if (snapshot.exists()) {
          this.thumbnailImage = data.thumbnail
          this.imageFromRef = data.fullsize
        } else {
          this.setDefaultImages() 
        }
      })
    }
  },

  computed: {
    width () {
      if (this.aspectRatio > 1) {
        return 600
      } else {
        return this.height * this.aspectRatio
      }
    },
    height () {
      if (this.aspectRatio > 1) {
        return this.width / this.aspectRatio
      } else {
        return 600
      }
    },
    format () {
      if (this.quality < 0.99) {
        return 'jpeg'
      }
      return 'png'
    }
  },

  methods: {
    setDefaultImages () {
      this.thumbnailImage = 'https://dummyimage.com/20x20/000/fff'
      this.imageFromRef = 'https://dummyimage.com/600x400/000/fff'
    },

    rotate () {
      this.croppieInstance.rotate(90)
    },

    cancelUpload () {
      this.croppieInstance.destroy()
      this.croppieInstance = null
      this.uploadedImage = null
      this.croppedImage = null
      this.isLoading = false
    },

    confirmUpload () {
      this.isLoading = true

      this.getCroppedResults()
        .then(this.uploadToStorage)
        .then(this.updateDatabase)

        .then(this.stopLoading)
        .then(this.cancelUpload)

        .catch(this.onError)
    },

    getCroppedResults () {
      const instance = this

      const thumbnailPromise = instance.croppieInstance.result({
        type: 'blob',
        size: { width: 20, height: 20 / instance.aspectRatio },
        // format: instance.format,
        format: 'jpeg',
        circle: instance.circle,
        quality: 0.2
      })

      const fullSizePromise = instance.croppieInstance.result({
        type: 'blob',
        size: { width: instance.width, height: instance.height },
        format: instance.format,
        circle: instance.circle,
        quality: instance.quality
      })

      return Promise.all([thumbnailPromise, fullSizePromise])
    },

    uploadToStorage (imageData) {
      const thumbnailPromise = this.storageRef.child('thumbnail')
        .put(imageData[0])

      const fullSizePromise = this.storageRef.child('fullsize')
        .put(imageData[1])

      return Promise.all([thumbnailPromise, fullSizePromise])
        .then(snapshotArray => {
          return [
            snapshotArray[0].downloadURL,
            snapshotArray[1].downloadURL
          ]
        })
    },

    updateDatabase (newUrls) {
      if (this.firebaseReference !== null) {
        const thumbnailPromise = this.firebaseReference.child('thumbnail').set(newUrls[0])
        const fullSizePromise = this.firebaseReference.child('fullsize').set(newUrls[1])

        return Promise.all([thumbnailPromise, fullSizePromise])
      } else {
        // No database to update, just update the local copy 
        this.imageFromRef = newUrls[1]
      }
    },

    stopLoading () {
      this.isLoading = false
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

      window.requestAnimationFrame(function() {
        instance.croppieInstance = new Croppie(instance.$refs.image, {
          enforceBoundary: instance.enforceBoundary,
          enableOrientation: instance.allowRotations,
          viewport: {
            width: instance.width * 0.8,
            height: instance.height * 0.8,
            type: (instance.circle) ? 'circle' : 'square'
          },
          boundary: {
            width: instance.width,
            height: instance.height
          }
        })
      })
    }
  },

}
</script>
