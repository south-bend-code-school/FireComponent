import MediumEditor from 'medium-editor';
import 'croppie';
import TinyMCE from 'tinymce';

var FireHtml = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"inline"},[_c(_vm.customTag,{ref:"element",tag:"component",class:{ hide: _vm.shouldHide }})],1)},staticRenderFns: [],_scopeId: 'data-v-fc49c29e',
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
      this.innerHtml = this.defaultValue;
    } else if (this.firebaseReference !== null) {
      this.updateValueFromReference();
    }

    this.refreshMediumEditor();
  },

  beforeDestroy () {
    if (this.editable) {
      this.updateFirebaseWithValue(this.updatedValue);
    }

    this.tearDownEditor();
  },

  methods: {
    updateValueFromReference () {
      if (this.isListening === undefined) {
        this.isListening = this.firebaseReference.on('value', snapshot => {
          this.innerHtml = snapshot.val() || '';
        });
      }
    },

    tearDownEditor () {
      if (this.api) {
        this.api.unsubscribe('editableInput', this.onEdit);
        this.api.destroy();
      }
    },

    createWithOptions (options) {
      this.updateInnerHtml(this.innerHtml);

      this.api = new MediumEditor(this.$refs.element, options);
      this.api.subscribe('editableInput', this.onEdit);
    },

    setUpdatedValue (newValue) {
      this.updatedValue = newValue;
    },

    onEdit (e) {
      this.setUpdatedValue(e.target.innerHTML);

      if (this.async) {
        this.updateFirebaseWithValue(this.updatedValue);
      }
    },

    updateFirebaseWithValue (newValue) {
      if (this.firebaseReference !== null && this.updatedValue !== null) {
        this.firebaseReference.set(newValue)
          .catch(err => {
            console.error(err);
          });
      } else {
        console.warn("Firebase Reference is null, cannot update data");
      }
    },

    /**
     * There is currently no way to change the options of a medium editor
     * without destroying and re-setting up the MediumEditor object.
     * See: https://github.com/yabwe/medium-editor/issues/1129
     */
    refreshMediumEditor () {
      this.tearDownEditor();

      if (this.editable) {
        this.createWithOptions(this.mediumEditingOptions);
      } else {
        this.createWithOptions({
          toolbar: false,
          disableEditing: true,
          placeholder: false
        });
      }
    },

    /**
     * Updating the innerHTML MUST not be performed if the text did not actually change.
     * otherwise, the caret position will be reset.
     */
    updateInnerHtml (newHtml) {
      if (newHtml !== this.$refs.element.innerHTML) {
        this.$refs.element.innerHTML = newHtml;
      }
    }
  },

  computed: {
    firebaseReference () {
      return this.$firebase.database().ref(this.path)
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
        this.isListening(); // Stop listening to the firebase reference
      }
    },

    innerHtml (newHtml) {
      this.updateInnerHtml(newHtml);
    },

    editable (isEditable) {
      if (!isEditable && this.updatedValue !== null) {
        this.updateFirebaseWithValue(this.updatedValue);
      }

      this.refreshMediumEditor();
    },

    mediumEditorOptions (newOptions) {
      this.refreshMediumEditor();
    },

    defaultValue (newHtml) {
      if (this.isListening !== undefined) {
        // this.isListening()
        console.log('was listening');
      }
      this.updateInnerHtml(newHtml);
    }
  }
}

const component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("edit",[_c(_vm.customTag,{tag:"component",class:{ hide: _vm.hasLoaded, placeholder: true }},[_vm._v("...")])]),_vm._v(" "),_vm._t("display",[_c(_vm.customTag,{ref:"element",tag:"component",class:{ hide: _vm.shouldHide }})])],2)},staticRenderFns: [],_scopeId: 'data-v-5a21cb33',
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
    isNumber: {
      type: [Boolean],
      default: () => false
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
    this.$messenger.bus.$on('save', () => {
      if (this.editable) {
        this.updateFirebaseWithValue(this.updatedText);
      }
    });

    this.$messenger.bus.$on('reset', () => {
      if (this.editable) {
        this.discardEdits();
      }
    });

    if (this.defaultValue !== null) {
      this.innerText = this.defaultValue;
      this.hasLoaded = true;
    } else if (this.firebaseReference !== null) {
      this.updateValueFromReference();
    }

    this.refreshMediumEditor();
  },

  beforeDestroy () {
    this.tearDownEditor();
  },

  methods: {
    discardEdits () {
      this.api.resetContent();
    },

    updateValueFromReference () {
      if (this.isListening === undefined) {
        this.isListening = this.firebaseReference.on('value', snapshot => {
          this.innerText = snapshot.val() || '';
          this.hasLoaded = true;
        });
      }
    },

    tearDownEditor () {
      if (this.api) {
        this.api.unsubscribe('editableInput', this.onEdit);
        this.api.destroy();
      }
    },

    createWithOptions (options) {
      this.updateInnerHtml(this.innerText);

      this.api = new MediumEditor(this.$refs.element, options);
      this.api.subscribe('editableInput', this.onEdit);
    },

    setUpdatedValue (newValue) {
      this.updatedText = newValue;
    },

    onEdit (e) {
      this.setUpdatedValue(e.target.innerHTML);

      if (this.async) {
        this.updateFirebaseWithValue(this.updatedText);
      }
    },

    updateFirebaseWithValue (newValue) {
      if (this.firebaseReference !== null && this.updatedText !== null) {
        if(this.isNumber) {
          newValue = Number(newValue);
        }
        this.firebaseReference.set(newValue)
          .catch(err => {
            console.error(err);
          });
      } else {
        console.warn("Firebase Reference is null, cannot update data");
      }
    },

    /**
     * There is currently no way to change the options of a medium editor
     * without destroying and re-setting up the MediumEditor object.
     * See: https://github.com/yabwe/medium-editor/issues/1129
     */
    refreshMediumEditor () {
      this.tearDownEditor();

      if (this.editable) {
        this.createWithOptions({
          toolbar: true,
          disableEditing: false,
          disableReturn: true,
          placeholder: false
        });
      } else {
        this.createWithOptions({
          toolbar: false,
          disableEditing: true,
          placeholder: false
        });
      }
    },

    /**
     * Updating the innerHTML MUST not be performed if the text did not actually change.
     * otherwise, the caret position will be reset.
     */
    updateInnerHtml (newHtml) {
      if (newHtml !== this.$refs.element.innerHTML) {
        this.$refs.element.innerHTML = newHtml;
      }
    }
  },

  computed: {
    firebaseReference () {
      return this.$firebase.database().ref(this.path)
    },
    shouldHide () {
      return !this.innerText.length && !this.editable 
    },
  },

  watch: {
    async (isAsync) {
      if (isAsync && this.isListening !== undefined) {
        this.isListening(); // Stop listening to the firebase reference
      }
    },

    innerText (newHtml) {
      this.updateInnerHtml(newHtml);
    },

    editable (isEditable) {
      /*
      if (!isEditable && this.updatedText !== null) {
        this.updateFirebaseWithValue(this.updatedText)
      }
      */

      this.refreshMediumEditor();
    },

    mediumEditorOptions (newOptions) {
      this.refreshMediumEditor();
    },

    defaultValue (newHtml) {
      if (this.isListening !== undefined) {
        // this.isListening()
        console.log('was listening');
      }
      this.updateInnerHtml(newHtml);
    }
  }
};

var FireImage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"root",staticClass:"firecomponent--fire-image--container"},[_vm._t("display",[_c('div',{staticClass:"firecomponent--fire-image--display"},[_c('div',{staticClass:"firecomponent--fire-image--ratio-enforcer",style:({ paddingTop: _vm.padding*100+'%'})}),_vm._v(" "),_c('div',{staticClass:"firecomponent--fire-image--content",style:({ backgroundImage: 'url('+_vm.imageLocation+')'})})])],{src:_vm.imageLocation}),_vm._v(" "),(_vm.editable)?_c('div',{staticClass:"firecomponent--fire-image--edit-controller"},[_vm._t("edit-controller",[_c('label',{staticClass:"firecomponent--button firecomponent--fire-image-change-label",attrs:{"for":_vm.uniqueName,"title":"Click to upload new image"}},[_vm._v(" Change ")])],{for:_vm.uniqueName}),_vm._v(" "),_c('input',{attrs:{"type":"file","id":_vm.uniqueName},on:{"change":_vm.imageUploaded}})],2):_vm._e()],2)},staticRenderFns: [],_scopeId: 'data-v-138f7b76',
  name: 'fire-image',
  props: {
    storageRef: {
      type: [Object,String],
      default: () => null
    },
    editable: {
      type: [Boolean],
      default: () => false
    },
    aspectRatio: {
      type: [Number],
      default: () => 1.0
    },
    widths: {
      type: [Array],
      default: () => [320,500]
    },
    quality: {
      type: [Number],
      default: () => 1.0
    },
    circle: {
      type: [Boolean],
      default: () => false
    },
    enforceBoundary: {
      type: [Boolean],
      default: () => true
    },
    allowRotations: {
      type: [Boolean],
      default: () => true
    }
  },

  data () {
    return {
      uploadedImage: null,
      croppieInstance: null,
      croppedImage: null,
      newUpload: false,
      uploading: false,
      uploadTasks: [],
      imageLocation: null,
      index: null
    }
  },

  mounted () {
    if(this._storageRef) {
      this.loadFromStorage(this._storageRef);
    }
  },

  computed: {
    /**
     * A unique id for this fire-image component
     */
    uniqueName () {
      return Math.random().toString(36).substring(4)
    },
    width () {
      return this.$el && this.$el.clientWidth ? this.$el.clientWidth : null
    },
    height () {
      return this.width / this.aspectRatio
    },
    padding () {
      return 1/this.aspectRatio
    },
    format () {
      if (this.quality < 1) {
        return 'jpeg'
      }
      return 'png'
    },
    _storageRef () {
      if(this.storageRef) {
        try {
          return typeof this.storageRef === 'string' ? this.$firebase.storage().ref(this.storageRef) : this.$firebase.storage().refFromURL(this.storageRef.toString())
        } catch (e) {
          console.error(e);
          return null
        }
      }
    },
  },

  watch: {
    _storageRef (val) {
      if(val) {
        this.loadFromStorage(val);
      }
    }
  },

  methods: {
    loadFromStorage (ref) {
      ref = ref.child(''+this.getIndexToDisplay());
      ref.getDownloadURL().then((url) => {
        if(ref.parent.toString() !== this._storageRef.toString()){return;}
        this.imageLocation = url;
      },() => {
        console.error('No Image at specified location.');
      });
    },
    getIndexToDisplay () {
      const displaySize = this.$refs.root.clientWidth;
      var min = {
        index: 0,
        offset: null
      };
      this.widths.forEach((width, i) => {
        const offset = Math.abs(width - displaySize);
        if(min.offset === null || offset < min.offset) {
          min = {
            index: i,
            offset: offset
          };
        }
      });
      this.index=min.index;
      return min.index
    },
    imageUploaded (e) {
      const location = this._storageRef.toString();
      const config = {
        widths: this.widths,
        aspectRatio: this.aspectRatio,
        enforceBoundary: this.enforceBoundary,
        allowRotations: this.allowRotations,
        circle: this.circle,
        format: this.format
      };
      this.$imageBus.bus.$on(location + '-cancelled', this.newCancelledCallback(location));
      this.$imageBus.bus.$on(location + '-completed', this.newCompletedCallback(location));
      this.$imageBus.newUpload(location, e, config);
    },
    newCancelledCallback (location) {
      const callback = () => {
        this.$imageBus.bus.$off(location + '-cancelled', callback);
      };
      return callback
    },
    newCompletedCallback (location) {
      const callback = (e, urls) => {
        this.$imageBus.bus.$off(location + '-completed', callback);
        const index = this.getIndexToDisplay();
        this.imageLocation = urls[index];
      };
      return callback
    }
  }
}

var FireInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.customTag,{tag:"component"},[(_vm.editable)?_c('span',{key:_vm.editorKey,ref:"editor",staticClass:"editor",style:(_vm.editorStyle),attrs:{"contenteditable":"true"},on:{"input":_vm.contentChangeEventHandler}},[_vm._v(" "+_vm._s(_vm.content)+" ")]):_vm._t("display",[_vm._v(" "+_vm._s(_vm.content)+" ")],{content:_vm.content})],2)},staticRenderFns: [],_scopeId: 'data-v-df63bd98',
  name: 'fire-input',
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
      default: () => Object.create(null)
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
      firebaseRef: this.$firebase.database().ref(this.path),
      editorKey: 'editor-' + Math.random().toString(36).substring(4)
    }
  },
  watch: {
    'editable' (val) {
      if (!val) {
        this.updateContent();
      }
    },
    'snapshotVal' (val) {
      if (!this.editable || !this.isLoaded) {
        this.isLoaded = true;
        this.updateContent();
      }
    }
  },
  methods: {
    updateContent () {
      this.hasChanges = false;
      this.content = this.snapshotVal;
      this.editableContentSnapshot = this.snapshotVal;
    },
    finished () {
      this.$nextTick(() => {
        if (!this.error) {
          this.reset();
        }
        this.saving = false;
      });
    },
    save () {
      this.saving = true;

      if (this.useTransaction && typeof this.snapshotVal === 'number') {
        this.firebaseRef.transaction((value) => {
          const diff = this.snapshotVal.constructor(this.editableContentSnapshot) - this.content;
          return value + diff
        }, (err, committed, snapshot) => {
          if (err) {
            this.error = err;
          } else if (!committed) {
            this.error = 'Did not save.';
          }

          this.finished();
        }, false);
      } else {
        this.firebaseRef.set(this.snapshotVal.constructor(this.editableContentSnapshot)).catch(
          (err) => {
            this.error = err;
          }
        ).then(this.finished);
      }
    },
    reset () {
      this.updateContent();

      this.$nextTick(() => {
        if (this.$refs.editor.innerText !== this.editableContentSnapshot) {
          this.$refs.editor.innerText = this.editableContentSnapshot;
        }
      });
    },
    contentChangeEventHandler (e) {
      this.editableContentSnapshot = e.target.innerText;
    }
  },
  mounted: function () {
    this.isLoaded = false;

    this.unsub = this.firebaseRef.on('value', (snapshot) => {
      this.hasChanges = true;
      this.snapshotVal = snapshot.exists() ? snapshot.val() : null;
    });

    this.$messenger.bus.$on('save', this.save);
    this.$messenger.bus.$on('reset', this.reset);
  },
  beforeDestroy () {
    if (this.unsub) {
      this.firebaseRef.off('value', this.unsub);
    }
  }
}

var ImageEditor = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.event),expression:"event"}],ref:"root",staticClass:"firecomponent--image-editor--container"},[_c('div',{staticClass:"firecomponent--image-editor--vertical-aligner"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.uploading),expression:"!uploading"}]},[_vm._t("croppie-header",[_c('h1',{staticClass:"firecomponent--image-editor--header"},[_vm._v("Crop Photo")])]),_vm._v(" "),_c('div',{staticClass:"firecomponent--image-editor--croppie-wrapper"},[_c('div',{ref:"croppie"})]),_vm._v(" "),_c('div',{staticClass:"firecomponent--image-editor--controls"},[_vm._t("croppie-controls",[(_vm.allowOrientation)?_c('button',{staticClass:"firecomponent--button",on:{"click":function($event){_vm.rotate(-90);}}},[_vm._v("Rotate Left")]):_vm._e(),_vm._v(" "),(_vm.allowOrientation)?_c('button',{staticClass:"firecomponent--button",on:{"click":function($event){_vm.rotate(90);}}},[_vm._v("Rotate Right")]):_vm._e(),_vm._v(" "),_c('button',{staticClass:"firecomponent--button",on:{"click":_vm.cancel}},[_vm._v("Cancel")]),_vm._v(" "),_c('button',{staticClass:"firecomponent--button",on:{"click":_vm.upload}},[_vm._v("Complete")])],{rotate:_vm.rotate,cancel:_vm.cancel,upload:_vm.upload})],2)],2),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.uploading),expression:"uploading"}],staticClass:"firecomponent--image-editor--uploading-controls"},[_vm._t("uploading",[_c('button',{staticClass:"firecomponent--button",on:{"click":_vm.cancel}},[_vm._v("Cancel Upload")]),_vm._v(" "),_c('button',{staticClass:"firecomponent--button",on:{"click":_vm.continueWithoutWaiting}},[_vm._v("Continue Without Waiting")])],{cancel:_vm.cancel,noWait:_vm.continueWithoutWaiting})],2)])])},staticRenderFns: [],
  name: 'FireImageEditor',
  data () {
    return {
      event: null,
      croppie: null,
      location: null,
      task: null,
      config: null,
      tasks: {},
      uploading: false,
      watchers: {}
    }
  },
  created () {
    this.$imageBus.bus.$on('newUpload', this.handleUpload);
  },
  computed: {
    storageRef () {
      return this.$firebase.storage().refFromURL(this.location || '')
    },
    fileURL () {
      return this.files.length ? window.URL.createObjectURL(this.files[0]) : ''
    },
    files () {
      return this.event ? this.event.target.files : []
    },
    viewport () {
      if (!this.config) {
        return null
      }
      const base = this.boundary.width*0.8;
      const viewport = {
        type: this.config.circle ? 'circle' : 'square'
      };
      if (this.config.aspectRatio > 1) {
        viewport.width = base;
        viewport.height = base / this.config.aspectRatio;
      } else {
        viewport.width = base / this.config.aspectRatio;
        viewport.height = base;
      }
      return viewport
    },
    boundary () {
      const maxWidth = window.innerWidth*0.8;
      const maxHeight = window.innerHeight*0.5;
      const chosen = Math.min(maxWidth,maxHeight);
      return {
        width: chosen,
        height: chosen
      }
    },
    imageFormat () {
      if (!this.config) {
        return null
      }
      return this.config.circle ? 'png' : this.config.format
    },
    allowOrientation () {
      return this.config ? this.config.enableOrientation : false
    }
  },
  methods: {
    initializeCroppie () {
      this.$nextTick(() => {
        this.croppie = new window.Croppie(this.$refs.croppie, {
          enforceBoundary: this.config.enforceBoundary,
          enableOrientation: this.config.enableOrientation,
          viewport: this.viewport,
          boundary: this.boundary
        });
        this.croppie.bind({
          url: this.fileURL
        });
      });
    },
    handleUpload (location, e, config) {
      if (this.event || e.target.files.length <= 0) {
        return this.$imageBus.bus.$emit(location + '-cancelled', e)
      }
      this.event = e;
      this.location = location;
      this.config = config;
      this.initializeCroppie();
    },
    rotate (degrees) {
      if (this.croppie && this.allowOrientation) {
        this.croppie.rotate(degrees);
      }
    },
    cancel () {
      this.$imageBus.bus.$emit(this.location + '-cancelled', this.e);
      const tasks = this.tasks[this.location];
      if (tasks && tasks.length) {
        tasks.forEach((task) => {
          task.cancel();
        });
      }
      this.teardown();
    },
    teardown () {
      this.destroyCroppie();
      this.location = null;
      this.event = null;
      this.config = null;
    },
    destroyCroppie () {
      if (this.croppie) {
        this.croppie.destroy();
        this.croppie = null;
      }
    },
    upload () {
      const locationCopy = this.location;
      const eventCopy = this.event;
      this.tasks[locationCopy] = [];
      this.uploading = true;
      Promise.all(
        this.config.widths.map((width, index) => {
          const ref = this.storageRef.child(index+'');
          return this.getCroppedImage(width)
            .then((image) => {
              return this.uploadToCloudStorage(image, ref)
            })
        })
      ).then((snapshots) => {
        if (locationCopy === this.location) {
          this.teardown();
          this.uploading = false;
        }
        this.tasks[locationCopy] = null;
        this.$imageBus.bus.$emit(locationCopy + '-completed', eventCopy, snapshots.map((ss) => { return ss.downloadURL }));
      });
    },
    getCroppedImage (width) {
      return this.croppie.result({
        type: 'blob',
        size: {
          width: width
        },
        format: this.imageFormat,
        circle: this.config.circle,
        quality: this.config.quality || 1,
      })
    },
    uploadToCloudStorage (image, ref) {
      var task = ref.put(image);
      this.tasks[this.location].push(task);
      return task
    },
    continueWithoutWaiting () {
      this.teardown();
      this.uploading = false;
    }
  },
}

var HTMLEditor = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":_vm.editorId},domProps:{"innerHTML":_vm._s(_vm.value)}})},staticRenderFns: [],_scopeId: 'data-v-58a47308',
  name: 'FireComponentHTMLEditor',
  props: {
    plugins: {
      type: Array,
      validator (plugins) {
        return plugins.reduce((p, c) => { return p && typeof c === 'string' }, true)
      },
      default: () => [
        "print",
        "preview",
        "fullpage",
        "powerpaste",
        "searchreplace",
        "autolink",
        "directionality",
        "advcode",
        "visualblocks",
        "visualchars",
        "fullscreen",
        "image",
        "link",
        "media",
        "template",
        "codesample",
        "table",
        "charmap",
        "hr",
        "pagebreak",
        "nonbreaking",
        "anchor",
        "toc",
        "insertdatetime",
        "advlist",
        "lists",
        "textcolor",
        "wordcount",
        "tinymcespellchecker",
        "a11ychecker",
        "imagetools",
        "mediaembed",
        "linkchecker",
        "contextmenu",
        "colorpicker",
        "textpattern",
        "help"
      ]
    },
    toolbar: {
      type: String,
      default: () => 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat'
    },
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      TinyMCE.init({
        selector: this.editorId,
        theme: 'modern',
        mobile: {
          theme: 'mobile'
        },
        plugins: this.plugins.join(' '),
        toolbar1: this.toolbar,
        init_instance_callback: this.setupEventTriggers
      });
    });
  },
  beforeDestroy () {
    this.destroy();
  },
  computed: {
    editorId () {
      return 'firecomponent--html-editor--' + this.$uniqId;
    },
    setupEventTriggers (editor) {
      this.editor = editor;
      this.editor.on('Change', (e) => {
        this.$emit('input', this.editor.getContent());
      });
    },
    destroy () {
      if (this.editor) {
        this.editor.destroy();
      }
    }
  }
}

var InlineEditor = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.customTag,{tag:"component",staticStyle:{"width":"100%"},attrs:{"title":_vm.title},on:{"mouseover":_vm.startEdit,"mouseleave":_vm.attemptStop}},[(_vm.isEditing)?_c('div',{key:_vm.uniqueKey,ref:"editor",staticClass:"firecomponent--inline-editor",style:(_vm.editorStyle),attrs:{"contenteditable":"true"},on:{"blur":_vm.stopEdit,"input":_vm.contentChangeEventHandler}},[_vm._v(" "+_vm._s(_vm.value)+" ")]):_vm._t("display",[_vm._v(" "+_vm._s(_vm.value)+" ")],{content:_vm.value})],2)},staticRenderFns: [],_scopeId: 'data-v-8691ead4',
  name: 'FireComponentInlineEditor',
  props: {
    value: {
      type: [String,Number],
      required: true
    },
    editable: {
      required: true,
      type: [Boolean]
    },
    customTag: {
      type: [String],
      default: 'span'
    },
    editorStyle: {
      type: [Object],
      default: () => Object.create(null)
    }
  },
  data () {
    return {
      uniqueKey: 'firecomponent--inline-editor--' + this.$uniqId,
      isEditing: false
    }
  },
  computed: {
    title () {
      if (this.editable) {
        return 'Click to Edit'
      }
      return null
    }
  },
  methods: {
    contentChangeEventHandler (e) {
      this.$emit('input', e);
    },
    startEdit (e) {
      this.isEditing = this.editable;
    },
    stopEdit (e) {
      this.isEditing = false;
    },
    attemptStop (e) {
      this.isEditing = this.$refs.editor === document.activeElement;
    }
  }
}

function newImageBus (_Vue) {
  var bus = new _Vue();

  var newUpload = function (...params) {
    bus.$emit('newUpload', ...params);
  };

  return {
    bus,
    newUpload
  }
}

function newFireMessenger (_Vue) {
  var bus = new _Vue();
  var send = function (message) {
    bus.$emit(message);
  };
  var save = function () {
    send('save');
  };
  var reset = function () {
    send('reset');
  };
  return {
    bus,
    send,
    save,
    reset
  }
}

// Install the components
function install (Vue, firebase) {
  if (typeof firebase === 'object') {
    Vue.prototype.$firebase = firebase;
  } else {
    console.error('You must add your firebase configuration object to the firecomponent library');
    return;
  }

  Vue.prototype.$imageBus = newImageBus(Vue);
  Vue.prototype.$messenger = newFireMessenger(Vue);
  // Add a accessor for getting the unique id of the component
  Object.defineProperty(Vue.prototype, '$uniqId', {
    get () {
      return this._uid
    },
  });

  var editorID = 'firecomponent--image-editor';
  var insertElem = window.document.createElement("div");
  insertElem.id = editorID;
  window.document.body.appendChild(insertElem);
  new Vue({
    el: '#'+editorID,
    render: h => h(ImageEditor)
  });

  Vue.component('fire-text', component);
  Vue.component('fire-html', FireHtml);
  Vue.component('fire-image', FireImage);
  Vue.component('fire-input', FireInput);
  Vue.component('fire-html-editor', HTMLEditor);
  Vue.component('fire-inline-editor', InlineEditor);
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
var plugin = {
  /* eslint-disable no-undef */
  install: install
};

// Auto-install
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.initializeApp = function (config) {
    Vue.use(plugin, config);
  };
}

export default plugin;
export { install, FireHtml, component as FireText, FireImage, FireInput };
