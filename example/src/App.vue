<template>
  <div id="app">
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper blue">
          <a href="#" class="brand-logo center">FireComponents</a>
          <a href="#" data-activates="slide-out" class="button-collapse show-on-large"><i class="material-icons">menu</i></a>
        </div>
      </nav>
    </div>

    <div class="container">
      <h1 class="center">Fire Components Demo</h1>

      <div class="center row">
        <button @click="toggleEdit" class="btn-large waves-effect waves-light blue lighten-2 white-text">
          {{ buttonText }}
        </button>
      </div>

      <div class="center row" v-if="editable">
        <button @click="resetData" class="btn-large waves-effect waves-light blue lighten-2 white-text">
          Reset
        </button>
        <button @click="saveData" class="btn-large waves-effect waves-light blue lighten-2 white-text">
          Save
        </button>
      </div>

      <ul id="slide-out" class="side-nav">
        <li><a href="#demo">Full Demo</a></li>
        <li><a href="#text">FireText</a></li>
        <li><a href="#html">FireHtml</a></li>
        <li><a href="#image">FireImage</a></li>
      </ul>

      <hr>

      <div class="row center section scrollspy" id="demo">
        <div class="row col s12">
          <fire-text
            :firebaseReference="dbRef.child('body')"
            customTag="h2"
            :editable="editable"
            :async="false"
          />
        </div>
        <div class="row col s12">
          <fire-image
            class="col s12 m4 offset-m4"
            :aspectRatio="4/3"
            :storageRef="sRef.child('image')"
            :editable="editable"
          />
        </div>
        <div class="row col s12">
          <fire-html
            class="flow-text"
            :firebaseReference="dbRef.child('body2')"
            customTag="p"
            :editable="editable"
            :async="true"
          />
        </div>
      </div>

      <hr>

      <div class="card-panel">
        <h4 class="thin">Current Database:</h4>
        <div v-if="database">
          <pre v-highlightjs="databaseString"><code class="json"></code></pre>
        </div>
      </div>

      <!-- FireText Simple -->
      <div class="card-panel section scrollspy" id="text">
        <h5 class="center">FireText Component</h5>
        <p class="center">Editable Text Element</p>

        <p>Example Code:</p>
        <pre v-highlightjs><code class="html">&lt;fire-text
  :firebaseReference=&quot;dbRef.child('body')&quot;
  customTag=&quot;p&quot;
  :editable=&quot;editable&quot;
  :async=&quot;true&quot;
/&gt;</code></pre>

        <ul class="collapsible" data-collapsible="accordion">
          <li>
            <div class="collapsible-header"><i class="material-icons">settings</i>Params</div>
            <div class="collapsible-body">
              <p class="hide-on-med-and-up">View in landscape to see params</p>
              <table class="hide-on-small-only bordered striped centered">
                <thead>
                  <tr>
                      <th>Param Name</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                  </tr>
                </thead>
        
                <tbody>
                  <tr>
                    <td>Async</td>
                    <td>Boolean</td>
                    <td>false</td>
                    <td>If true, any edits are immediately pushed to firebase. If false, edits are only pushed when editing is stopped.</td>
                  </tr>
                  <tr>
                    <td>firebaseReference</td>
                    <td>Object</td>
                    <td>null</td>
                    <td>The Firebase reference to push to when the changes are saved.  Also the source of the component value if `defaultValue` is not set</td>
                  </tr>
                  <tr>
                    <td>defaultValue (optional)</td>
                    <td>String</td>
                    <td>null</td>
                    <td>If present, this determines the text value of the created element. This value will override the listener on the `firebaseReference`</td>
                  </tr>
                  <tr>
                    <td>customTag</td>
                    <td>String</td>
                    <td>"p"</td>
                    <td>The type of DOM node you would like displayed.</td>
                  </tr>
                  <tr>
                    <td>editable</td>
                    <td>Boolean</td>
                    <td>false</td>
                    <td>Determines if the current user can edit the text within this component</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
        </ul>

        <hr style="margin-top: 20px; margin-bottom: 20px;">
        <button @click="toggleEdit" class="btn right waves-effect waves-light blue lighten-2 white-text">{{ buttonText }}</button>
        <h5 style="margin-bottom: 25px;">Try It:</h5>
    
        <fire-text
          class="flow-text"
          :firebaseReference="dbRef.child('body')"
          customTag="p"
          :editable="editable"
          :async="true"
        ></fire-text>
    
        <blockquote>
        The value is <fire-text class="red-text" :firebaseReference="dbRef.child('body')" customTag="span"></fire-text>
        </blockquote>

      </div>
  
      <!-- FireHtml Simple -->
      <div class="card-panel section scrollspy" id="html">
        <h5 class="center">FireHtml Component</h5>
        <p class="center">Editable HTML Element with Customizable Toolbar</p>

        <p>Example Code:</p>
        <pre v-highlightjs><code class="html">&lt;fire-html
  firebaseReference=&quot;dbRef.child(&apos;body2&apos;)&quot;
  customTag=&quot;p&quot;
  :editable=&quot;editable&quot;
  :async=&quot;true&quot;
/&gt;</code></pre>

        <hr style="margin-top: 20px; margin-bottom: 20px;">
        <button @click="toggleEdit" class="btn right waves-effect waves-light blue lighten-2 white-text">{{ buttonText }}</button>
        <h5 style="margin-bottom: 25px;">Try It:</h5>
    
        <fire-html
          class="flow-text"
          :firebaseReference="dbRef.child('body2')"
          customTag="p"
          :editable="editable"
          :async="true"
        ></fire-html>
    
        <blockquote>
        The value is <fire-text class="red-text" :firebaseReference="dbRef.child('body2')" customTag="span"></fire-text>
        </blockquote>
      </div>

      <!-- FireImage Simple -->
      <div class="card-panel row section scrollspy" id="image">
        <h5 class="center">FireImage Component</h5>
        <p class="center">Editable Image using Croppie.js</p>

        <p>Example Code:</p>
        <pre v-highlightjs><code class="html">&lt;fire-image
  :storageRef=&quot;storage(&apos;image&apos;)&quot;
  :editable=&quot;editable&quot;
/&gt;</code></pre>

        <hr style="margin-top: 20px; margin-bottom: 20px;">
        <button @click="toggleEdit" class="btn right waves-effect waves-light blue lighten-2 white-text">{{ buttonText }}</button>
        <h5 style="margin-bottom: 25px;">Try It:</h5>
    
        <fire-image
          class="col s12 m4 offset-m4"
          :aspectRatio="4/3"
          :storageRef="sRef.child('image')"
          :firebaseReference="dbRef.child('image')"
          :editable="editable"
        ></fire-image>
      </div>
    </div>

  </div>
</template>

<script>
import Messanger from './FireMessanger'

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
      body: null,
      database: null,
      doubled: 0
    }
  },
  mounted () {
    window['$']('.collapsible').collapsible()
    $('.scrollspy').scrollSpy({
      scrollOffset: 75 
    });
    $(".button-collapse").sideNav({
      closeOnClick: true  
    });

    this.dbRef.child('body').on('value', snapshot => {
      this.body = snapshot.val()
    })
    this.dbRef.on('value', snapshot => {
      this.database = snapshot.val()
    })
    this.dbRef.child('magicNumber').on('value', snapshot => {
      this.doubled = snapshot.val() * 2
    })
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
    databaseString () {
      return JSON.stringify(this.database, null, 2)
    }
  }
}
</script>

<style lang="scss">
</style>
