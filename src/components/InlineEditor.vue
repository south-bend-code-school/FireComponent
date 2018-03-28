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
      uniqueKey: 'firecomponent--inline-editor--' + this.$uniqId
    }
  },
  methods: {
    contentChangeEventHandler (e) {
      this.$emit('input', e)
    }
  }
}
</script>

<template>
  <component :is='customTag'>
    <span :key='uniqueKey' class='firecomponent--inline-editor' :style='editorStyle' ref='editor' v-if='editable' @input='contentChangeEventHandler' contenteditable="true">
      {{content}}
    </span>
    <slot name='display' v-else :content='content'>
      {{content}}
    </slot>
  </component>
</template>

<style scoped>
  .firecomponent--inline-editor {
    border: 1px dashed #202020 !important;
    font-size: 16px;
    font-weight: 400;
    display: inherit;
  }
</style>