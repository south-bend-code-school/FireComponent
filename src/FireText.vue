<template lang="pug">
  component(
    :class="{ hide: innerHtml === undefined }",
    :is="customTag",
    ref="element"
  )
</template>

<style lang="stylus" scoped>
  [contenteditable=true]
    border: 1px dashed #202020
    background-color: rgba(255, 255, 255, 0.2)

  .medium-editor-placeholder:after
    margin: 0
</style>

<script>
import MediumEditor from 'medium-editor'

export default {
  name: 'fire-text',
  props: {
    firebaseReference: {
      type: [Object],
      default: () => null
    },
    dataType: {
      type: [String],
      default: () => 'text'
    },
    customTag: {
      type: [String],
      default: () => 'div'
    },
    editable: {
      type: [Boolean],
      default: () => false
    },
    mediumEditingOptions: {
      type: [Object],
      default: () => {
        toolbar: true
      }
    },
  },

  data () {
    return {
      innerHtml: ''
    }
  },

  mounted (evt) {
    if (this.editable) {
      this.createWithOptions(this.mediumEditorOptions)
    } else {
      this.createWithOptions(this.mediumEditorOptions)
    }
  },

  beforeDestroy (evt) {
    this.tearDown()
  },

  methods: {
    tearDown () {
      this.api.unsubscribe('editableInput', this.updateFirebase)
      this.api.destroy()
    },
    createWithOptions (options) {
      this.$refs.element.innerHTML = this.innerHtml

      this.api = new MediumEditor(this.$refs.element, options)
      this.api.subscribe('editableInput', this.updateFirebase)
    },
    updateFirebase (e) {
      if (this.firebaseRef !== null) {
        this.firebaseRef.set(this.value)
          .catch(err => {
            console.error(err)
          })
      } else {
        console.warn("Firebase Reference is null, cannot update data")
      }
    },
    /**
     * There is currently no way to change the options of a medium editor
     * without destroying and re-setting up the MediumEditor object.
     * See: https://github.com/yabwe/medium-editor/issues/1129
     */
    refreshMediumEditor () {
      this.tearDown()

      if (newValue) {
        this.createWithOptions(this.mediumEditorOptions)
      } else {
        this.createWithOptions({
          toolbar: false,
          disableEditing: true
        })
      }
    }
  },
  computed: {
    value () {
      if (this.dataType === 'number') {
        return this.innerHtml.replace(/\D/g, '')
      }

      return this.innerHtml
    }
  },
  watch: {
    text (newText) {
      // innerHTML MUST not be performed if the text did not actually change.
      // otherwise, the caret position will be reset.
      if (newText !== this.$refs.element.innerHTML) {
        this.$refs.element.innerHTML = this.text
      }
    },
    editable (newValue) {
      this.refreshMediumEditor()
    },
    mediumEditorOptions (newOptions) {
      this.refreshMediumEditor()
    }
  },
  MediumEditor
}
</script>
