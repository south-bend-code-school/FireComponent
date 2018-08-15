<script>
import EditableMixin from '../common/EditableMixin';
import * as FirestoreHelpers from '../../helpers/firestore';
export default {
  mixins: [EditableMixin],
  name: 'FireComponent-Firestore-Number',
  props: {
    path: {
      required: true,
      validator (path) {
        return (path.hasOwnProperty('firestore') && path.hasOwnProperty('collection'))
          || FirestoreHelpers.VALID_DOC_PATH.test(path)
      }
    },
    fieldPath: {
      type: Array,
      required: true,
      validator (fieldPath) {
        return fieldPath.reduce((p, c) => {
          return p && c.constructor === String
        })
      }
    }
  },
  data () {
    return {
      document: null
    }
  },
  computed: {
    content () {
      try {
        return this.fieldPath.reduce((path, step) => {
          return path[step]
        }, this.document) || 0
      } catch (e) {
        return 0
      }
    },
    reference () {
      if (typeof this.path === 'string') {
        return this.$firebase.firestore().doc(this.path)
      }

      return this.path
    },
  },
  methods: {
    loadData (path) {
      return new Promise((resolve, reject) => {
        this.$bindAsObject('document', path, reject, resolve)
      })
    },
    updateData (val) {
      return this.reference.update(this.fieldPath.join('.'), val)
    },
    editableOnInput (e) {
      this.shownVal = Number(e.target.textContent.replace(/[^0-9\.]/g, ''))
    }
  }
}
</script>

<template lang="pug" src="../common/Editable.pug"></template>

<style lang="scss" src="../common/Editable.scss" scoped></style>
