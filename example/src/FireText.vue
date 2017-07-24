<template>
  <component
    :class="{ hide: innerHtml === undefined }"
    :is="customTag"
    ref="element"
  ></component>
</template>

<style scoped>
  [contenteditable=true] {
    border: 1px dashed #202020;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .medium-editor-placeholder:after {
    margin: 0;
  }
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
    if (this.firebaseReference !== null) {
      this.firebaseReference.on('value', snapshot => {
        this.innerHtml = snapshot.val()
      })
    }

    if (this.editable) {
      this.createWithOptions(this.mediumEditingOptions)
    } else {
      this.createWithOptions({
        toolbar: false,
        disableEditing: true,
        placeholder: false
      })
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
      let value = e.target.innerHTML
      if (this.dataType === 'number') {
        return this.$refs.element.innerHTML.replace(/\D/g, '')
      }

      if (this.firebaseReference !== null) {
        this.firebaseReference.set(value)
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

      if (this.editable) {
        this.createWithOptions(this.mediumEditorOptions)
      } else {
        this.createWithOptions({
          toolbar: false,
          disableEditing: true
        })
      }
    }
  },
  watch: {
    innerHtml (newHtml) {
      // innerHTML MUST not be performed if the text did not actually change.
      // otherwise, the caret position will be reset.
      if (newHtml !== this.$refs.element.innerHTML) {
        this.$refs.element.innerHTML = newHtml
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
