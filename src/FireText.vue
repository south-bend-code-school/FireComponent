<template>
  <div class="inline">
    <component
      :class="{ hide: shouldHide }"
      :is="customTag"
      ref="element"
    ></component>
    <template v-if="shouldHide && editable">
      <button @click="addField">Add Field +</button>
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
      default: () => 'p'
    },
    editable: {
      type: [Boolean],
      default: () => false
    }
  },

  data () {
    return {
      innerText: '',
      updatedText: null 
    }
  },

  mounted (evt) {
    console.log(this.firebaseReference)
    if (this.defaultValue !== null) {
      this.innerText = this.defaultValue
    } else if (this.firebaseReference !== null) {
      this.updateValueFromReference()
    }

    this.refreshMediumEditor()
  },

  beforeDestroy () {
    if (this.editable) {
      this.updateFirebaseWithValue(this.updatedText)
    }

    this.tearDownEditor()
  },

  methods: {
    addField () {
      this.$refs.element.innerHTML = 'lorem ipsum dolor sit amet'
      this.innerText = 'lorem ipsum dolor sit amet'
      this.setUpdatedValue('lorem ipsum dolor sit amet')
    },

    updateValueFromReference () {
      if (this.isListening === undefined) {
        this.isListening = this.firebaseReference.on('value', snapshot => {
          this.innerText = snapshot.val() || ''
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
      this.updateInnerHtml(this.innerText)

      this.api = new MediumEditor(this.$refs.element, options)
      this.api.subscribe('editableInput', this.onEdit)
    },

    setUpdatedValue (newValue) {
      this.updatedText = newValue
    },

    onEdit (e) {
      this.setUpdatedValue(e.target.innerHTML)

      if (this.async) {
        this.updateFirebaseWithValue(this.updatedText)
      }
    },

    updateFirebaseWithValue (newValue) {
      if (this.firebaseReference !== null && this.updatedText !== null) {
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
        this.createWithOptions({
          toolbar: false,
          disableEditing: false,
          disableReturn: true,
          placeholder: false
        })
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
      // TODO: Clean up this mumbo-jumbo code
      return !this.innerText.length || 
        (this.updatedText !== null && !this.updatedText.replace(/<\/?[^>]+(>|$)/g, "").length)
    },
  },

  watch: {
    async (isAsync) {
      if (isAsync && this.isListening !== undefined) {
        this.isListening() // Stop listening to the firebase reference
      }
    },

    innerText (newHtml) {
      this.updateInnerHtml(newHtml)
    },

    editable (isEditable) {
      if (!isEditable && this.updatedText !== null) {
        this.updateFirebaseWithValue(this.updatedText)
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
