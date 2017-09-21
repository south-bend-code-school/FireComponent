<template>
  <div class="inline">
    <component
      :class="{ hide: shouldHide }"
      :is="customTag"
      ref="element"
    ></component>
  </div>
</template>

<style>
  /**
   *This ensures that span elements under the medium editor do not take up
   * an entire line. It cannot be a scoped style because the p tag inside
   * the medium editor does not have the same scope as the span
   */
  span[contentEditable] p {
    display: inline;
  }
</style>

<style scoped>
  @import '//cdn.jsdelivr.net/medium-editor/latest/css/medium-editor.min.css';
  @import '//cdnjs.cloudflare.com/ajax/libs/medium-editor/5.23.2/css/themes/default.min.css';

  .inline {
    display: inline
  }

  [contenteditable=true] {
    border: 1px dashed #202020;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .medium-editor-placeholder:after {
    margin: 0;
  }

  .hide {
    display: none;
  }
</style>

<script>
import MediumEditor from 'medium-editor'

export default {
  name: 'fire-html',
  props: {
    async: {
      type: [Boolean],
      default: () => false
    },
    path: {
      type: [String],
      default: () => undefined
    },
    defaultValue: {
      type: [String],
      default: () => null
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
        return {
          toolbar: true,
          placeholder: false
        }
      }
    },
  },

  data () {
    return {
      innerHtml: '',
      updatedValue: null 
    }
  },

  mounted (evt) {
    if (this.defaultValue !== null) {
      this.innerHtml = this.defaultValue
    } else if (this.firebaseReference !== null) {
      this.updateValueFromReference()
    }

    this.refreshMediumEditor()
  },

  beforeDestroy () {
    if (this.editable) {
      this.updateFirebaseWithValue(this.updatedValue)
    }

    this.tearDownEditor()
  },

  methods: {
    updateValueFromReference () {
      if (this.isListening === undefined) {
        this.isListening = this.firebaseReference.on('value', snapshot => {
          this.innerHtml = snapshot.val() || ''
        })
      }
    },

    tearDownEditor () {
      if (this.api) {
        this.api.unsubscribe('editableInput', this.onEdit)
        this.api.destroy()
      }
    },

    createWithOptions (options) {
      this.updateInnerHtml(this.innerHtml)

      this.api = new MediumEditor(this.$refs.element, options)
      this.api.subscribe('editableInput', this.onEdit)
    },

    setUpdatedValue (newValue) {
      this.updatedValue = newValue
    },

    onEdit (e) {
      this.setUpdatedValue(e.target.innerHTML)

      if (this.async) {
        this.updateFirebaseWithValue(this.updatedValue)
      }
    },

    updateFirebaseWithValue (newValue) {
      if (this.firebaseReference !== null && this.updatedValue !== null) {
        this.firebaseReference.set(newValue)
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
      this.tearDownEditor()

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

    /**
     * Updating the innerHTML MUST not be performed if the text did not actually change.
     * otherwise, the caret position will be reset.
     */
    updateInnerHtml (newHtml) {
      if (newHtml !== this.$refs.element.innerHTML) {
        this.$refs.element.innerHTML = newHtml
      }
    }
  },

  computed: {
    firebaseReference () {
      return this._database.ref(this.path)
    },
    shouldHide () {
      // TODO: Clean up this mumbo-jumbo code
      return (!this.plainText.length || 
        (this.updatedValue !== null && !this.updatedValue.replace(/<\/?[^>]+(>|$)/g, "").length))
        && !this.editable
    },

    plainText () {
      return this.innerHtml.replace(/<\/?[^>]+(>|$)/g, '')
    }
  },

  watch: {
    async (isAsync) {
      if (isAsync && this.isListening !== undefined) {
        this.isListening() // Stop listening to the firebase reference
      }
    },

    innerHtml (newHtml) {
      this.updateInnerHtml(newHtml)
    },

    editable (isEditable) {
      if (!isEditable && this.updatedValue !== null) {
        this.updateFirebaseWithValue(this.updatedValue)
      }

      this.refreshMediumEditor()
    },

    mediumEditorOptions (newOptions) {
      this.refreshMediumEditor()
    },

    defaultValue (newHtml) {
      if (this.isListening !== undefined) {
        // this.isListening()
        console.log('was listening')
      }
      this.updateInnerHtml(newHtml)
    }
  }
}
</script>
