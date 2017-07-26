<template>
  <div class="inline">
    <component
      :class="{ hide: shouldHide }"
      :is="customTag"
      ref="element"
    ></component>
    <template v-if="shouldHide && editable">
      <button style="display: block" @click="addField">Add Field +</button>
    </template>
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
  name: 'fire-text',
  props: {
    async: {
      type: [Boolean],
      default: () => false
    },
    firebaseReference: {
      type: [Object],
      default: () => null
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
        toolbar: true
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
    addField () {
      this.$refs.element.innerHTML = 'lorem ipsum dolor sit amet'
      this.innerHtml = 'lorem ipsum dolor sit amet'
      this.setUpdatedValue('lorem ipsum dolor sit amet')
    },

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
      if (this.dataType === 'number') {
        newValue = newValue.replace(/\D/g, '') || null
        // newValue = this.plainText || 0
      }

      if (this.dataType === 'slug') {
        newValue = newValue.replace(/<\/?[^>]+(>|$)/g, "")
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
          .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
          .replace(/^-+|-+$/g, ''); // remove leading, trailing -
      }

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
        this.createWithOptions(this.mediumEditorOptions)
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
    shouldHide () {
      if (this.dataType === 'number') {
        return this.updatedValue === null
      }

      // TODO: Clean up this mumbo-jumbo code
      return !this.plainText.length || 
        (this.updatedValue !== null && !this.updatedValue.replace(/<\/?[^>]+(>|$)/g, "").length)
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
