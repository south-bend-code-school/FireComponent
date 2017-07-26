import MediumEditor from 'medium-editor'
import firebase from '@/service/firebase'

export default {
  name: 'fire-text',
  props: {
    text: [String],
    dataType: {
      type: [String],
      default: () => 'text'
    },
    customTag: {
      type: [String],
      default: () => 'div'
    },
    firebaseLoc: {
      type: [String],
      default: () => null
    },
    editable: {
      type: [Boolean],
      default: () => false
    },
    mediumEditingOptions: {
      type: [Object],
      default: () => {
        toolbar: false,
        disableEditing: true
      }
    },
    firebaseApi: {
      type: [Object],
      default: () => null
    }
  },

  mounted (evt) {
    this.createAndSubscribe()
  },

  beforeDestroy (evt) {
    this.tearDown()
  },
  methods: {
    tearDown () {
      this.api.unsubscribe('editableInput', this.updateFirebase)
      this.api.destroy()
    },
    createAndSubscribe () {
      this.$refs.element.innerHTML = this.text

      this.api = new MediumEditor(this.$refs.element, this.mediumEditorOptions)
      this.api.subscribe('editableInput', this.updateFirebase)
    },
    updateFirebase (e) {
      let value = e.srcElement.innerHTML
      if (this.dataType == 'number') {
        value = value.replace(/\D/g, '')  
      }

      if (this.firebaseLoc !== null && this.firebaseApi !=== null) {
        firebaseApi.database()
          .ref(this.firebaseLoc)
          .set(value)
          .catch(err => {
            console.error(err)
          })
      }
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
    /**
     * There is currently no way to change the options of a medium editor
     * without destroying and re-setting up the MediumEditor object.
     * See: https://github.com/yabwe/medium-editor/issues/1129
     */
    mediumEditorOptions (newOptions) {
      this.tearDown()
      this.createAndSubscribe()
    }
  },
  MediumEditor
}
