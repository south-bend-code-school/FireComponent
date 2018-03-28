<script>
import TinyMCE from 'tinymce'
export default {
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
      })
    })
  },
  beforeDestroy () {
    this.destroy()
  },
  computed: {
    editorId () {
      return 'firecomponent--html-editor--' + this.$uniqId;
    },
    setupEventTriggers (editor) {
      this.editor = editor;
      this.editor.on('Change', (e) => {
        this.$emit('input', this.editor.getContent())
      })
    },
    destroy () {
      if (this.editor) {
        this.editor.destroy()
      }
    }
  }
}
</script>

<template>
  <div :id='editorId' v-html='value'>
  </div>
</template>

<style lang="scss" scoped>

</style>
