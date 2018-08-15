export default {
  props: {
    path: {
      required: true,
      validator: () => {
        throw new Error('NOT IMPLEMENTED')
      }
    },
    customTag: {
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      componentEditable: false,
      isEditing: false,
      shownVal: this.value,
      sourceChanged: false,
      updating: false,
      isBlurring: false,
      showEditableIndicator: false
    }
  },
  created () {
    this.$fc_permission.bus.$on('permissionChange', this.editableMixinPermissionChange)
  },
  beforeDestroy () {
    this.$fc_permission.bus.$off('permissionChange', this.editableMixinPermissionChange)
  },
  watch: {
    content (val, old) {
      if ((!this.isEditing && old === this.shownVal) || !this.componentEditable) {
        this.shownVal = val
      }
    },
    reference: {
      handler (val) {
        if (val) {
          this.loading = true
          this.loadData(val)
            .catch(() => {
              // TODO: Display error
            })
            .then(() => {
              this.loading = false
              this.shownVal = this.content
            })
        }
      },
      immediate: true
    },
    shownVal (val) {
      this.$nextTick(() => {
        if (this.$refs.editElement) {
          this.$refs.editElement.innerText = val
        }
      })
    }
  },
  computed: {
    reference () {
      throw new Error('NOT IMPLEMENTED')
    }
  },
  methods: {
    editableMixinPermissionChange (permission) {
      this.componentEditable = !!permission
    },
    editableOnFocus () {
      this.isEditing = true
      this.isBlurring = false
    },
    editableOnBlur () {
      this.isBlurring = true
      setTimeout(() => {
        this.isEditing = !this.isBlurring
      }, 10)
    },
    editableOnInput (e) {
      this.shownVal = e.target.textContent
    },
    editableOnSave () {
      this.updating = true
      this.shownVal = this.$refs.editElement.textContent
      this.updateData(this.shownVal)
        .then(() => {
          this.updating = false
        })
    },
    editableOnCancel () {
      this.shownVal = this.content
    },
    loadData () {
      throw new Error('NOT IMPLEMENTED')
    },
    updateData () {
      throw new Error('NOT IMPLEMENTED')
    },
    editableOnMouseOver () {
      this.showEditableIndicator = true
    },
    editableOnMouseLeave () {
      this.showEditableIndicator = false
    }
  }
}