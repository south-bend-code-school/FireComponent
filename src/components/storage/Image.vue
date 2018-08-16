<template>
  <div class="firecomponent--fire-image--container" ref="root" @mouseover="showEdit = true" @mouseleave="showEdit = false">
    <slot name="display" :src="displayURL">
      <div class="firecomponent--fire-image--display">
        <div class="firecomponent--fire-image--ratio-enforcer" :style="{ paddingTop: padding*100+'%'}"></div>
        <div class="firecomponent--fire-image--content" :style="{ backgroundImage: 'url('+displayURL+')', backgroundColor: bgColor }"></div>
      </div>
    </slot>
    <div class="firecomponent--fire-image--edit-controller" v-if="editable" :class="{ 'firecomponent--fire-image--hide-on-desktop': !showEditBtn }" @click.stop="() => {}">
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
@media only screen and (min-width : 601px) {
  .firecomponent--fire-image--hide-on-desktop {
    display: none;
  }
}

.firecomponent--fire-image--container {
  position: relative;
}

.firecomponent--fire-image--edit-controller {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  max-width: 200px;
  text-align: right;
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
    color: white;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
</style>

<script>
import * as StorageHelpers from '../../helpers/storage';
export default {
  name: 'fire-image',
  props: {
    path: {
      type: [Object,String],
      required: true,
      validator (path) {
        return (!!path.bucket && typeof path.bucket === 'string')
          || StorageHelpers.VALID_PATH.test(path)
      }
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
    },
    bgColor: {
      type: [String],
      default: 'inherit'
    },
    noImageText: {
      type: [String],
      default: 'No Image'
    },
    textColor: {
      type: [String],
      default: '#909090'
    }
  },

  data () {
    return {
      newUpload: false,
      index: null,
      imageURL: '',
      showEdit: false,
      width: 0,
      height: 0,
      loading: true
    }
  },
  computed: {
    /**
     * A unique id for this fire-image component
     */
    showEditBtn () {
      return this.editable && this.showEdit
    },
    uniqueName () {
      return Math.random().toString(36).substring(4)
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
    reference () {
      if (this.path) {
        try {
          return typeof this.path === 'string' ? this.$firebase.storage().ref(this.path) : this.$firebase.storage().refFromURL(this.path.toString())
        } catch (e) {
          console.error(e)
          return null
        }
      }
    },
    displayURL () {
      return this.imageURL
        || `"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='${50/this.aspectRatio}px' width='50px'><text text-anchor='middle' x='25' y='${25/this.aspectRatio}' fill='${this.textColor}' font-size='5'>${this.loading ? 'Loading...' : this.noImageText}</text></svg>"`
    }
  },
  watch: {
    reference: {
      handler (val) {
        this.$nextTick(() => {
          if (val) {
            this.loadFromStorage(val)
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    loadFromStorage (reference) {
      this.loading = true
      this.imageURL = ''
      reference = reference.child(''+this.getIndexToDisplay())
      reference.getDownloadURL()
        .then((url) => {
          if(reference.parent.toString() !== this.reference.toString()){return;}
          this.imageURL = url
        })
        .catch((err) => {
          if (process.env.NODE_ENV !== 'production') {
            console.error(err)
          }
        })
        .then(() => {
          this.loading = false
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
      const location = this.reference.toString()
      const config = {
        widths: this.widths,
        aspectRatio: this.aspectRatio,
        enforceBoundary: this.enforceBoundary,
        allowRotations: this.allowRotations,
        circle: this.circle,
        format: this.format
      }
      this.$fc_image.bus.$on(location + '-cancelled', this.newCancelledCallback(location))
      this.$fc_image.bus.$on(location + '-completed', this.newCompletedCallback(location))
      this.$fc_image.newUpload(location, e, config)
    },
    newCancelledCallback (location) {
      const callback = () => {
        this.$fc_image.bus.$off(location + '-cancelled', callback)
      }
      return callback
    },
    newCompletedCallback (location) {
      const callback = (e, urls) => {
        this.$fc_image.bus.$off(location + '-completed', callback)
        const index = this.getIndexToDisplay()
        if (!urls[index]) {
          this.loadFromStorage(this.reference)
        } else {
          this.imageURL = urls[index]
        }
      }
      return callback
    }
  }
}
</script>
