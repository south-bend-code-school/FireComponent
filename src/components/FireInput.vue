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
    },
    'editorStyle': {
      type: [Object],
      default: Object.create(null)
    }
  },
  data () {
    return {
      content: null,
      snapshotVal: null,
      editableContentSnapshot: null,
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
      if (!val) {
        this.updateContent()
      }
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
      this.editableContentSnapshot = this.snapshotVal
    },
    finished () {
      this.$nextTick(() => {
        if (!this.error) {
          this.reset()
        }
        this.saving = false
      })
    },
    save () {
      this.saving = true

      if (this.useTransaction && typeof this.snapshotVal === 'number') {
        this.firebaseRef.transaction((value) => {
          const diff = this.snapshotVal.constructor(this.editableContentSnapshot) - this.content
          return value + diff
        }, (err, committed, snapshot) => {
          if (err) {
            this.error = err
          } else if (!committed) {
            this.error = 'Did not save.'
          }

          this.finished()
        }, false)
      } else {
        this.firebaseRef.set(this.snapshotVal.constructor(this.editableContentSnapshot)).catch(
          (err) => {
            this.error = err
          }
        ).then(this.finished)
      }
    },
    reset () {
      this.updateContent()

      this.$nextTick(() => {
        if (this.$refs.editor.innerText !== this.editableContentSnapshot) {
          this.$refs.editor.innerText = this.editableContentSnapshot
        }
      })
    },
    contentChangeEventHandler (e) {
      this.editableContentSnapshot = e.target.innerText
    }
  },
  mounted: function () {
    this.isLoaded = false

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
    <span class='editor' :style='editorStyle' ref='editor' v-if='editable' @input='contentChangeEventHandler' contenteditable="true">
      {{content}}
    </span>
    <slot name='display' v-else :content='content'>
      {{content}}
    </slot>
  </component>
</template>

<style scoped>
  .editor {
    border: 1px dashed #202020 !important;
    font-size: 16px;
    font-weight: 400;
    display: inherit;
  }
</style>
