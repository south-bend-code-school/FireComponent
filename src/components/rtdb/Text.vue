<script>
import EditableMixin from '../common/EditableMixin';
import * as RTDBHelpers from '../../helpers/rtdb';
export default {
  mixins: [EditableMixin],
  name: 'FireComponent-RTDB-Text',
  props: {
    path: {
      required: true,
      validator (path) {
        return path.hasOwnProperty('root')
          || RTDBHelpers.VALID_PATH.test(path)
      }
    }
  },
  data () {
    return {
      json: null
    }
  },
  computed: {
    content () {
      try {
        return this.json['.value'] || ''
      } catch (e) {
        return ''
      }
    },
    reference () {
      return this.$firebase.database().ref(this.path)
    }
  },
  methods: {
    loadData (path) {
      return new Promise((resolve, reject) => {
        this.$bindAsObject('json', path, reject, resolve)
      })
    },
    updateData (val) {
      return this.reference.set(val)
    }
  }
}
</script>

<template lang="pug" src="../common/Editable.pug"></template>

<style lang="scss" src="../common/Editable.scss" scoped></style>
