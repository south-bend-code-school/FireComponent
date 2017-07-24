<template>
  <div id="app">
    <h1>Testing FireText</h1>
    <button @click="toggleEdit">Toggle Editing</button>

    <fire-text
      :firebaseReference="ref('title')"
      customTag="h2"
      :editable="editable"
    ></fire-text>

    <fire-text
      :firebaseReference="ref('body')"
      customTag="p"
      :editable="editable"
    ></fire-text>
  </div>
</template>

<script>
const firebase = window['firebase']
const config = {
  apiKey: "AIzaSyB1Xz49dpWzkyBG-n2SL7_6FDpkncR6Ioo",
  authDomain: "firevue-test.firebaseapp.com",
  databaseURL: "https://firevue-test.firebaseio.com",
  projectId: "firevue-test",
  storageBucket: "",
  messagingSenderId: "276471204872"
};
firebase.initializeApp(config);

export default {
  name: 'app',
  data () {
    return {
      rootReference: firebase.database().ref(),
      editable: false
    }
  },
  methods: {
    toggleEdit () {
      this.editable = !this.editable
    },
    ref (childName) {
      return this.rootReference.child(childName)
    }
  }
}
</script>

<style lang="scss">
</style>
