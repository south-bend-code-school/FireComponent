<script>
import Messanger from './FireMessanger'

export default {
  props: {
    'firebaseRef': {
      required: true,
      validator: function (val) {
        return typeof val.off === 'function' && typeof val.set === 'function' && typeof val.on === 'function' && typeof val.transaction === 'function'
      }
    },
    'editable': {
      required: true,
      type: [Boolean]
    },
    'useTransaction': {
      type: [Boolean],
      default: false
    }
  },
  data () {
    return {
      innerText: null,
      _innerText: null,
      unsub: null,
      hasChanges: false,
      saving: false,
      error: null,
      startTime: null
    }
  },
  watch: {
    'editable' (val) {
      this.$nextTick(() => {
        this.$el.contentEditable = val
      })
    },
    '_innerText' (val) {
      if (!this.editable) {
        this.hasChanges = false
        this.innerText = this._innerText
      }
    }
  },
  methods: {
    save () {
      this.saving = true
      if (this.useTransaction && typeof this._innerText === 'number') {
        this.firebaseRef.transaction((value) => {
          const diff = this.innerText - this._innerText.constructor(this.$el.innerText)
          return value + diff
        }, (err, committed, snapshot) => {
          if (err) {
            this.error = err
          } else if (!committed) {
            this.error = 'Did not save.'
          }

          this.saving = false
        }, false)
      } else {
        this.firebaseRef.set(this._innerText.constructor(this.$el.innerText)).catch(
          (err) => {
            this.error = err
          }
        ).then(() => {
          this.saving = false
        })
      }
    }
  },
  created () {
    this.unsub = this.firebaseRef.on('value', (snapshot) => {
      this.hasChanges = true
      this._innerText = snapshot.val()
    })
  },
  mounted () {
    Messanger.bus.$on('save', () => {
      this.save()
    })
  },
  beforeDestroy () {
    if (this.unsub) {
      this.firebaseRef.off('value', this.unsub)
    }
  }
}
</script>

<template>
  <span v-if='saving'>
    <slot name='spinner'>
      saving
    </slot>
  </span>
  <span v-else>
    {{innerText}}
  </span>
</template>

<style scoped>
  span[contentEditable] {
    border: 2px dashed black !important;
    font-size: 16px !important;
    font-weight: 400 !important;
  }
</style>
