<script>
import Messanger from './FireMessanger'

export default {
  props: {
    'firebaseRef': {
      required: true,
      validator: function (val) {
        return typeof val.off === 'function' && typeof val.set === 'function' && typeof val.on === 'function' && typeof val.transaction === 'function'
      }
    },
    'editable': {
      required: true,
      type: [Boolean]
    },
    'useTransaction': {
      type: [Boolean],
      default: false
    },
    'customTag': {
      type: [String],
      default: 'span'
    }
  },
  data () {
    return {
      content: null,
      snapshotVal: null,
      unsub: null,
      hasChanges: false,
      saving: false,
      error: null,
      startTime: null,
      isLoaded: false
    }
  },
  watch: {
    'editable' (val) {
      if (!val && this.hasChanges) {
        this.updateContent()
      }
      this.$nextTick(() => {
        this.$el.contentEditable = val
      })
    },
    'snapshotVal' (val) {
      if (!this.editable || !this.isLoaded) {
        this.isLoaded = true
        this.updateContent()
      }
    }
  },
  methods: {
    updateContent () {
      this.hasChanges = false
      this.content = this.snapshotVal
    },
    save () {
      const innerTextSnapshot = this.$el.innerText
      this.saving = true
      if (this.useTransaction && typeof this.snapshotVal === 'number') {
        this.firebaseRef.transaction((value) => {
          const diff = this.content - this.snapshotVal.constructor(innerTextSnapshot)
          return value + diff
        }, (err, committed, snapshot) => {
          if (err) {
            this.error = err
          } else if (!committed) {
            this.error = 'Did not save.'
          }

          this.content = innerTextSnapshot
          this.saving = false
        }, false)
      } else {
        this.firebaseRef.set(this.snapshotVal.constructor(innerTextSnapshot)).catch(
          (err) => {
            this.error = err
          }
        ).then(() => {
          this.content = innerTextSnapshot
          this.saving = false
        })
      }
    }
  },
  mounted: function () {
    this.isLoaded = false
    this.$nextTick(() => {
      this.$el.contentEditable = this.editable
    })
    this.unsub = this.firebaseRef.on('value', (snapshot) => {
      this.hasChanges = true
      this.snapshotVal = snapshot.val() || ''
    })
    Messanger.bus.$on('save', () => {
      this.save()
    })
  },
  beforeDestroy () {
    if (this.unsub) {
      this.firebaseRef.off('value', this.unsub)
    }
  }
}
</script>

<template>
  <component v-if='saving' :is='customTag'>
    <slot name='spinner'>
      saving
    </slot>
  </component>
  <component v-else :is='customTag'>
    {{content}}
  </component>
</template>

<style scoped>
  [contenteditable=true] {
    border: 1px dashed #202020 !important;
    font-size: 16px !important;
    font-weight: 400 !important;
  }
</style>
