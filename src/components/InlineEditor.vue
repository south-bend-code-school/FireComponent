<script>
export default {
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
      this.$emit('input', e)
    },
    startEdit (e) {
      this.isEditing = this.editable
    },
    stopEdit (e) {
      this.isEditing = false
    },
    attemptStop (e) {
      this.isEditing = this.$refs.editor === document.activeElement
    }
  }
}
</script>

<template>
  <component :is='customTag' @mouseover='startEdit' @mouseleave='attemptStop' style='width: 100%;' :title='title'>
    <div :key='uniqueKey' class='firecomponent--inline-editor' @blur='stopEdit' :style='editorStyle' ref='editor' v-if='isEditing' @input='contentChangeEventHandler' contenteditable="true">
      {{value}}
    </div>
    <slot name='display' ref='displayer' v-else :content='value'>
      {{value}}
    </slot>
  </component>
</template>

<style lang="scss" scoped>
.firecomponent--inline-editor {
  &:focus {
    outline: -webkit-focus-ring-color auto 5px;
  }
  width: 100%;
  display: inline-block;
}
</style>