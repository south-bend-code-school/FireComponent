<template lang="pug">
  div
    v-layout(row, wrap)
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
            v-layout(row, wrap)
              v-flex(xs12)
                fire-text.text-xs-center(
                  :firebaseReference="dbRef.child('body')"
                  customTag="h2"
                  :editable="editable"
                  :async="false"
                )
              v-flex(xs12 md6 offset-md3)
                fire-image.text-xs-center(
                  :aspectRatio="4/3"
                  :storageRef="sRef.child('image')"
                  :editable="editable"
                )
              v-flex.mt-2.text-xs-center(xs12 md6 offset-md3)
                fire-html.subheading(
                  :firebaseReference="dbRef.child('body2')"
                  customTag="h5"
                  :editable="editable"
                  :async="true"
                )
</template>

<script>
import Messanger from '../FireMessanger'

const firebase = window['firebase']
const config = {
  apiKey: "AIzaSyB1Xz49dpWzkyBG-n2SL7_6FDpkncR6Ioo",
  authDomain: "firevue-test.firebaseapp.com",
  databaseURL: "https://firevue-test.firebaseio.com",
  projectId: "firevue-test",
  storageBucket: "firevue-test.appspot.com",
  messagingSenderId: "276471204872"
};
firebase.initializeApp(config);

export default {
  name: 'app',
  data () {
    return {
      dbRef: firebase.database().ref(),
      sRef: firebase.storage().ref(),
      editable: false,
    }
  },
  methods: {
    toggleEdit () {
      this.editable = !this.editable
    },
    resetData () {
      Messanger.reset()
    },
    saveData () {
      Messanger.save()
    }
  },
  computed: {
    buttonText () {
      return this.editable ? 'Stop editing' : 'Edit'
    },
  }
}
</script>
