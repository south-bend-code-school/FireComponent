<script>
import Messanger from './FireMessanger'

export default {
  props: {
    'path': {
      required: true,
      type: [String]
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
      isLoaded: false,
      firebaseRef: this.$firebase.database().ref(this.path)
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
          const diff = this.snapshotVal.constructor(innerTextSnapshot) - this.content
          return value + diff
        }, (err, committed, snapshot) => {
          if (err) {
            this.error = err
          } else if (!committed) {
            this.error = 'Did not save.'
          }

          if (!this.error) {
            this.updateContent()
          }
          this.saving = false
        }, false)
      } else {
        this.firebaseRef.set(this.snapshotVal.constructor(innerTextSnapshot)).catch(
          (err) => {
            this.error = err
          }
        ).then(() => {
          if (!this.error) {
            this.updateContent()
          }
          this.saving = false
        })
      }
    },
    reset () {
      this.content = this.$el.innerText
      this.$nextTick(() => {
        this.updateContent()
      })
    }
  },
  mounted: function () {
    this.isLoaded = false
    this.$nextTick(() => {
      this.$el.contentEditable = this.editable
    })
    this.unsub = this.firebaseRef.on('value', (snapshot) => {
      this.hasChanges = true
      this.snapshotVal = snapshot.exists() ? snapshot.val() : null
    })
    Messanger.bus.$on('save', this.save)
    Messanger.bus.$on('reset', this.reset)
  },
  beforeDestroy () {
    if (this.unsub) {
      this.firebaseRef.off('value', this.unsub)
    }
  }
}
</script>

<template>
  <component :is='customTag'>
    <template v-if='editable'>
      {{content}}
    </template>
    <slot name='display' v-else :content='content'>
      {{content}}
    </slot>
  </component>
</template>

<style scoped>
  [contenteditable=true] {
    border: 1px dashed #202020 !important;
    font-size: 16px !important;
    font-weight: 400 !important;
  }
</style>
