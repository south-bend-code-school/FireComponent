<script>
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
      watchers: {}
    }
  },
  created () {
    ImageBus.bus.$on('newUpload', this.handleUpload)
  },
  computed: {
    storageRef () {
      return this._firebase.storage().ref(this.location || '')
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
      const width = this.config.widths.sort((a, b) => { return b - a})[0]
      return {
        width: width,
        height: width / this.config.aspectRatio,
        type: this.config.circle ? 'circle' : 'square'
      }
    },
    boundary () {
      if (!this.config) {
        return null
      }
      if (this.config.aspectRatio > 1) {
        return {
          width: this.viewport.width,
          height: this.viewport.height
        }
      } else {
        return {
          width: this.viewport.height,
          height: this.viewport.height
        }
      }
    },
    imageFormat () {
      if (!this.config) {
        return null
      }
      return this.config.circle ? 'png' : this.config.format
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
      if (this.croppie) {
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
      Promise.all([
        this.config.widths.map((width, index) => {
          const ref = this.storageRef.child(index+'')
          return this.getCroppedImage(width)
            .then((image) => {
              return this.uploadToCloudStorage(image, ref)
            })
        })
      ])
      .then((snapshots) => {
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
      <template v-show="!uploading">
        <slot name="croppie-header">
          <h1 class="firecomponent--image-editor--header">Crop Photo</h1>
        </slot>
        <div class="firecomponent--image-editor--croppie-wrapper">
          <div ref="croppie"></div>
        </div>
        <div class="firecomponent--image-editor--controls">
          <slot name="croppie-controls" :rLeft="rotateLeft" :rRight="rotateRight" :cancel="cancelCropping" :upload="confirmUpload">
            <button @click="rotateLeft">Rotate Left</button>
            <button @click="rotateRight">Rotate Right</button>
            <button @click="cancelCropping">Cancel</button>
            <button @click="confirmUpload">Complete</button>
          </slot>
        </div>
      </template>
      <template v-show="uploading">
        <slot name="uploading" :cancel="cancelUpload" :noWait="noWait">
          <button @click="cancelUpload">Cancel Upload</button>
          <button @click="noWait">Continue Without Waiting</button>
        </slot>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.firecomponent--image-editor--button {
  padding: 0 1em;
  border-radius: 1000px !important;
  text-transform: none;
  background-color: black;
  color: white;
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
}
</style>
