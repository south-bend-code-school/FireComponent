<template lang="pug">
  #home
    v-layout(row wrap)

      v-flex(xs12)
        v-parallax(src="https://vuetifyjs.com/static/doc-images/vbanner.jpg", height=600)
          v-layout(column align-center justify-center)
            h1.white--text Fire Components
            h4.white--text Declarative Components that bind to Firebase Rererences

            v-flex(xs12)
              a(href="https://www.github.com/dmattia/FireComponent")
                v-btn.grey.darken-3.white--text(large)
                  v-icon.white--text code
                  span.ml-2 Github
      
              router-link(to="/demo")
                v-btn.green.darken-1.white--text(large)
                  span.mr-2 Get Started
                  v-icon.white--text.right chevron_right

      v-flex.pt-5(xs12).grey.lighten-3
        v-container
          h3.text-xs-center Getting Started

          h5.text-xs-center Download Via Npm
          pre.headline.text-xs-center(v-highlightjs="true")
            code.Bash $ npm install firecomponent

          h5.text-xs-center.mt-3 Include in your main.js file
          // pre.headline.text-xs-center(v-highlightjs="true")
          pre.headline(v-highlightjs="true")
            code.javascript
              | import FireComponent from 'firecomponent'
              |  Vue.use(FireComponent, {
              |    apiKey: "AIzaSyB1Xz49dpWzkyBG-n2SL7_6FDpkncR6Ioo",
              |    authDomain: "firevue-test.firebaseapp.com",
              |    databaseURL: "https://firevue-test.firebaseio.com",
              |    projectId: "firevue-test",
              |    storageBucket: "firevue-test.appspot.com",
              |    messagingSenderId: "276471204872"
              |  })

          .text-xs-center.mt-5
            router-link(to="/demo")
              v-btn.red.white--text(light large) View Demo

            router-link(to="/docs")
              v-btn.green.darken-1.white--text(light large) View Docs

</template>

<script>
export default {
  name: 'home',
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
