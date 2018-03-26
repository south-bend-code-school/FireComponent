<script>
import Croppie from 'croppie'
import * as ImageBus from './ImageBus'
export default {
  name: 'FireImageEditor',
  data () {
    return {
      event: null,
      croppie: null,
      location: null,
      task: null,
      config: null,
      tasks: {},
      uploading: false,
      watchers: {}
    }
  },
  created () {
    ImageBus.bus.$on('newUpload', this.handleUpload)
  },
  computed: {
    storageRef () {
      return this.$firebase.storage().refFromURL(this.location || '')
    },
    fileURL () {
      return this.files.length ? window.URL.createObjectURL(this.files[0]) : ''
    },
    files () {
      return this.event ? this.event.target.files : []
    },
    viewport () {
      if (!this.config) {
        return null
      }
      const base = this.boundary.width*0.8
      const viewport = {
        type: this.config.circle ? 'circle' : 'square'
      }
      if (this.config.aspectRatio > 1) {
        viewport.width = base
        viewport.height = base / this.config.aspectRatio
      } else {
        viewport.width = base / this.config.aspectRatio
        viewport.height = base
      }
      return viewport
    },
    boundary () {
      const maxWidth = window.innerWidth*0.8
      const maxHeight = window.innerHeight*0.5
      const chosen = Math.min(maxWidth,maxHeight)
      return {
        width: chosen,
        height: chosen
      }
    },
    imageFormat () {
      if (!this.config) {
        return null
      }
      return this.config.circle ? 'png' : this.config.format
    },
    allowOrientation () {
      return this.config ? this.config.enableOrientation : false
    }
  },
  methods: {
    initializeCroppie () {
      this.$nextTick(() => {
        this.croppie = new Croppie(this.$refs.croppie, {
          enforceBoundary: this.config.enforceBoundary,
          enableOrientation: this.config.enableOrientation,
          viewport: this.viewport,
          boundary: this.boundary
        })
        this.croppie.bind({
          url: this.fileURL
        })
      })
    },
    handleUpload (location, e, config) {
      if (this.event || e.target.files.length <= 0) {
        return ImageBus.bus.$emit(location + '-cancelled', e)
      }
      this.event = e
      this.location = location
      this.config = config
      this.initializeCroppie()
    },
    rotate (degrees) {
      if (this.croppie && this.allowOrientation) {
        this.croppie.rotate(degrees)
      }
    },
    cancel () {
      ImageBus.bus.$emit(this.location + '-cancelled', this.e)
      const tasks = this.tasks[this.location]
      if (tasks && tasks.length) {
        tasks.forEach((task) => {
          task.cancel()
        })
      }
      this.teardown()
    },
    teardown () {
      this.destroyCroppie()
      this.location = null
      this.event = null
      this.config = null
    },
    destroyCroppie () {
      if (this.croppie) {
        this.croppie.destroy()
        this.croppie = null
      }
    },
    upload () {
      const locationCopy = this.location
      const eventCopy = this.event
      this.tasks[locationCopy] = []
      this.uploading = true
      Promise.all(
        this.config.widths.map((width, index) => {
          const ref = this.storageRef.child(index+'')
          return this.getCroppedImage(width)
            .then((image) => {
              return this.uploadToCloudStorage(image, ref)
            })
        })
      ).then((snapshots) => {
        if (locationCopy === this.location) {
          this.teardown()
          this.uploading = false
        }
        this.tasks[locationCopy] = null
        ImageBus.bus.$emit(locationCopy + '-completed', eventCopy, snapshots.map((ss) => { return ss.downloadURL }))
      })
    },
    getCroppedImage (width) {
      return this.croppie.result({
        type: 'blob',
        size: {
          width: width
        },
        format: this.imageFormat,
        circle: this.config.circle,
        quality: this.config.quality || 1,
      })
    },
    uploadToCloudStorage (image, ref) {
      var task = ref.put(image)
      this.tasks[this.location].push(task)
      return task
    },
    continueWithoutWaiting () {
      this.teardown()
      this.uploading = false
    }
  },
}
</script>

<template>
  <div ref='root' v-if='event' class="firecomponent--image-editor--container">
    <div class="firecomponent--image-editor--vertical-aligner">
      <div v-show="!uploading">
        <slot name="croppie-header">
          <h1 class="firecomponent--image-editor--header">Crop Photo</h1>
        </slot>
        <div class="firecomponent--image-editor--croppie-wrapper">
          <div ref="croppie"></div>
        </div>
        <div class="firecomponent--image-editor--controls">
          <slot name="croppie-controls" :rotate="rotate" :cancel="cancel" :upload="upload">
            <button class="firecomponent--button" @click="rotate(-90)" v-if="allowOrientation">Rotate Left</button>
            <button class="firecomponent--button" @click="rotate(90)" v-if="allowOrientation">Rotate Right</button>
            <button class="firecomponent--button" @click="cancel">Cancel</button>
            <button class="firecomponent--button" @click="upload">Complete</button>
          </slot>
        </div>
      </div>
      <div class="firecomponent--image-editor--uploading-controls" v-show="uploading">
        <slot name="uploading" :cancel="cancel" :noWait="continueWithoutWaiting">
          <button class="firecomponent--button" @click="cancel">Cancel Upload</button>
          <button class="firecomponent--button" @click="continueWithoutWaiting">Continue Without Waiting</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.firecomponent--image-editor--container {
  background-color: white;
  z-index: 9999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
}
.firecomponent--image-editor--header {
  color: black;
  text-align: center;
}

.firecomponent--image-editor--croppie-wrapper {
  display: block;
  max-width: 100%;
  width: 100%;
  > div {
    max-width: 100%;
  }
}

.firecomponent--image-editor--controls {
  display: block;
  width: 100%;
  text-align: center;
}

.firecomponent--image-editor--vertical-aligner {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
}

.firecomponent--image-editor--uploading-controls {
  text-align: center;
}

.firecomponent--button {
  border-radius: 3px;
  text-transform: none;
  background-color: black;
  color: white;
  padding: 6px 10px;
  font-weight: bold;
  cursor: pointer;
}
</style>
