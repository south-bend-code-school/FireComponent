<template>
  <div>
    <slot name="edit" v-if="editable">
      <!-- Placeholder -->
      <component
        :class="{ hide: hasLoaded, placeholder: true }"
        :is="customTag"
      >...</component>
    </slot>
    <slot name="display" v-else>
      <component
        :class="{ hide: shouldHide }"
        :is="customTag"
        ref="element"
      ></component>
    </slot>
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

  span {
    display: inline-block;
    min-width: 8px;
  }

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

  .placeholder {
    background-color: #bdbdbd;
    color: #bdbdbd;
  }
</style>

<script>
import Messanger from './FireMessanger'
import MediumEditor from 'medium-editor'

const component = {
  name: 'fire-text',
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
      updatedText: null ,
      hasLoaded: false
    }
  },

  mounted (evt) {
    Messanger.bus.$on('save', () => {
      if (this.editable) {
        this.updateFirebaseWithValue(this.updatedText)
      }
    })

    Messanger.bus.$on('reset', () => {
      if (this.editable) {
        this.discardEdits()
      }
    })

    if (this.defaultValue !== null) {
      this.innerText = this.defaultValue
      this.hasLoaded = true
    } else if (this.firebaseReference !== null) {
      this.updateValueFromReference()
    }

    this.refreshMediumEditor()
  },

  beforeDestroy () {
    this.tearDownEditor()
  },

  methods: {
    discardEdits () {
      this.api.resetContent()
    },

    updateValueFromReference () {
      if (this.isListening === undefined) {
        this.isListening = this.firebaseReference.on('value', snapshot => {
          this.innerText = snapshot.val() || ''
          this.hasLoaded = true
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
    firebaseReference () {
      console.log(this.path)
      return this._database.ref(this.path)
    },
    shouldHide () {
      return !this.innerText.length && !this.editable 
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
      /*
      if (!isEditable && this.updatedText !== null) {
        this.updateFirebaseWithValue(this.updatedText)
      }
      */

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

export default component
</script>
