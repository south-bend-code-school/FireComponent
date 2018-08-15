<template lang="pug">
  .demo-root
    v-layout.mt-3(row, wrap)
      v-flex(xs12 md10 offset-md1)
        v-card
          v-card-title.blue.white--text(primary-title)
            v-layout(row, wrap)
              v-flex(xs12)
                h3.mb-0.white--text(xs12) FireComponents Demo
              v-flex(xs12)
                .subheading Explore the FireComponents working together

            v-spacer.text-xs-right
              div(v-if="editable")
                v-btn(@click="toggleEdit") Stop Editing
                v-btn(@click="resetData") Reset
                v-btn(@click="saveData") Save
              v-btn.white.blue--text(icon, fab, @click="toggleEdit", v-else)
                v-icon mode_edit

          v-card-text
            v-layout(row, wrap align-center)
              v-flex(xs12 md4)
                v-layout(row, wrap)
                  v-flex(xs12)
                    router-link(
                      to="/asdf"
                    )
                      fire-image.text-xs-center(
                        :aspectRatio="4/3"
                        :widths='[200,800]'
                        :path="sRef.child('image/asfjhg')"
                        :editable="editable"
                        noImageText="Hello?"
                      )
                  v-flex.mt-2(xs12)
                    fire-input(
                      path="caption"
                      :editable="editable"
                    )
                  v-flex.text-xs-center(xs12)
                    fire-input(
                      path="subheading"
                      :editable="editable"
                    )
                      template(
                        slot='display'
                        scope='props'
                      ) ${{props.content}} each
              v-flex(xs12 md8)
                v-layout(row, wrap)
                  v-flex(xs12)
                    fire-text(
                      path="mainheading"
                      customTag="h2"
                      :editable="editable"
                      :async="false"
                    )
                  v-flex(xs12)
                    fire-html.subheading(
                      path="subhtml"
                      customTag="h5"
                      :editable="editable"
                      :async="true"
                    )

</template>

<script>
import firebase from '../firebase'

export default {
  name: 'app',
  data () {
    return {
      dbRef: firebase.database().ref(),
      sRef: firebase.storage().ref(),
      editable: true,
    }
  },
  mounted () {
    this.$fc_permission.bus.$emit('permissionChange', true)
  },
  methods: {
    toggleEdit () {
      this.editable = !this.editable
    },
    resetData () {
      this.$messenger.reset()
    },
    saveData () {
      this.$messenger.save()
    }
  },
  computed: {
    buttonText () {
      return this.editable ? 'Stop editing' : 'Edit'
    },
    subheadingRef () {
      console.log()
      return this.dbRef.child('subheading')
    }
  }
}
</script>
