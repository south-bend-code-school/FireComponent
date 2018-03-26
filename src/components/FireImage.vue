<template>
  <div class="firecomponent--fire-image--container" ref="root">
    <slot name="display" :src="imageLocation">
      <div class="firecomponent--fire-image--display">
        <div class="firecomponent--fire-image--ratio-enforcer" :style="{ paddingTop: padding*100+'%'}"></div>
        <div class="firecomponent--fire-image--content" :style="{ backgroundImage: 'url('+imageLocation+')'}"></div>
      </div>
    </slot>
    <div class="firecomponent--fire-image--edit-controller" v-if="editable">
      <slot name="edit-controller" :for="uniqueName">
        <label class="firecomponent--button firecomponent--fire-image-change-label" :for="uniqueName" title="Click to upload new image">
          Change
        </label>
      </slot>
      <input type="file" :id="uniqueName" @change="imageUploaded">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.firecomponent--fire-image--container {
  position: relative;
}

.firecomponent--fire-image--edit-controller {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding-right: 10px !important;
  padding-bottom: 10px !important;
  > * {
    z-index: 2;
  }
  > input {
    display: none;
  }
}

.firecomponent--fire-image--display {
  width: 100%;
  position: relative;
  display: block;
  > .firecomponent--fire-image--ratio-enforcer {
    display: block;
    height: 0;
    width: 100%;
    padding-top: 100%;
  }

  > .firecomponent--fire-image--content {
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
</style>

<script>
import * as ImageBus from './ImageBus'

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
      imageLocation: null,
      index: null
    }
  },

  mounted () {
    if(this._storageRef) {
      this.loadFromStorage(this._storageRef)
    }
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
      const displaySize = this.$refs.root.clientWidth
      var min = {
        index: 0,
        offset: null
      }
      this.widths.forEach((width, i) => {
        const offset = Math.abs(width - displaySize)
        if(min.offset === null || offset < min.offset) {
          min = {
            index: i,
            offset: offset
          }
        }
      })
      this.index=min.index
      return min.index
    },
    imageUploaded (e) {
      const location = this._storageRef.toString()
      const config = {
        widths: this.widths,
        aspectRatio: this.aspectRatio,
        enforceBoundary: this.enforceBoundary,
        allowRotations: this.allowRotations,
        circle: this.circle,
        format: this.format
      }
      ImageBus.bus.$on(location + '-cancelled', this.newCancelledCallback(location))
      ImageBus.bus.$on(location + '-completed', this.newCompletedCallback(location))
      ImageBus.newUpload(location, e, config)
    },
    newCancelledCallback (location) {
      const callback = () => {
        ImageBus.bus.$off(location + '-cancelled', callback)
      }
      return callback
    },
    newCompletedCallback (location) {
      const callback = (e, urls) => {
        ImageBus.bus.$off(location + '-completed', callback)
        const index = this.getIndexToDisplay()
        this.imageLocation = urls[index]
      }
      return callback
    }
  }
}
</script>
