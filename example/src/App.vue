<template>
  <div id="app">
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper blue">
          <a href="#" class="brand-logo left" style="margin-left: 10px;">FireComponents</a>
          <ul id="nav-mobile" class="right">
            <li>
              <button @click="toggleEdit" class="btn-flat white-text">{{ buttonText }}</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="container">
      <h1 class="center">FireText Demo</h1>
  
      <div class="card-panel">
        <h4 class="thin">Current Database:</h4>
        <div v-if="database">
          <pre v-highlightjs="databaseString"><code class="json"></code></pre>
        </div>
      </div>

      <!-- FireText Simple -->
      <div class="card-panel">
        <h5 class="center">FireText Component</h5>
        <p class="center">Editable Text Element</p>

        <p>Example Code:</p>
        <pre v-highlightjs><code class="html">&lt;fire-text
  :firebaseReference=&quot;dbRef.child('body')&quot;
  customTag=&quot;p&quot;
  :editable=&quot;editable&quot;
  :async=&quot;true&quot;
&gt;&lt;/fire-text&gt;</code></pre>

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
      <div class="card-panel">
        <h5 class="center">FireHtml Component</h5>
        <p class="center">Editable HTML Element with Customizable Toolbar</p>

        <p>Example Code:</p>
        <pre v-highlightjs><code class="html">&lt;fire-html
  firebaseReference=&quot;dbRef.child(&apos;body2&apos;)&quot;
  customTag=&quot;p&quot;
  :editable=&quot;editable&quot;
  :async=&quot;true&quot;
&gt;&lt;/fire-html&gt;</code></pre>

        <hr style="margin-top: 20px; margin-bottom: 20px;">
        <button @click="toggleEdit" class="btn right waves-effect waves-light blue lighten-2 white-text">{{ buttonText }}</button>
        <h5 style="margin-bottom: 25px;">Try It:</h5>
    
        <fire-html
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
      <div class="card-panel">
        <h5 class="center">FireImage Component</h5>
        <p class="center">Editable Image using Croppie.js</p>

        <p>Example Code:</p>
        <pre v-highlightjs><code class="html">&lt;fire-image
  :storageRef=&quot;storage(&apos;image&apos;)&quot;
  :editable=&quot;editable&quot;
&gt;&lt;/fire-image&gt;</code></pre>

        <hr style="margin-top: 20px; margin-bottom: 20px;">
        <button @click="toggleEdit" class="btn right waves-effect waves-light blue lighten-2 white-text">{{ buttonText }}</button>
        <h5 style="margin-bottom: 25px;">Try It:</h5>
    
        <fire-image
          :storageRef="sRef.child('image')"
          :firebaseReference="dbRef.child('image')"
          :editable="editable"
          :circle="true"
          :enforceBoundary="false"
        ></fire-image>
      </div>
    </div>

  </div>
</template>

<script>
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
