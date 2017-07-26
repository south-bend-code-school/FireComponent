<template>
  <div id="app">
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper blue">
          <a href="#" class="brand-logo left" style="margin-left: 10px;">FireComponents</a>
          <ul id="nav-mobile" class="right">
            <li>
              <button @click="toggleEdit" class="btn-flat white-text">Toggle Editing</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="container">
      <h1 class="center">FireText Demo</h1>
  
      <div class="card-panel">
        <h4 class="thin">Current Database:</h4>
        <pre v-highlightjs><code class="json">{{ database }}</code></pre>
      </div>
  
      <!-- FireText Simple -->
      <div class="card-panel">
        <h5 class="center">FireText Component</h5>
        <p class="center">Editable Text Element</p>

        <p>Example Code:</p>
        <pre v-highlightjs><code class="html">&lt;fire-text
  :firebaseReference=&quot;ref('body')&quot;
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
        <button @click="toggleEdit" class="btn right waves-effect waves-light blue lighten-2 white-text">Toggle Editing</button>
        <h5 style="margin-bottom: 25px;">Try It:</h5>
    
        <fire-text
          :firebaseReference="ref('body')"
          customTag="p"
          :editable="editable"
          :async="true"
        ></fire-text>
    
        <blockquote>
        The value is <fire-text class="red-text" :firebaseReference="ref('body')" customTag="span"></fire-text>
        </blockquote>

      </div>
  
      <!-- FireHtml Simple -->
      <div class="card-panel">
        <h5 class="center">FireHtml Component</h5>
        <p class="center">Editable HTML Element with Customizable Toolbar</p>

        <p>Example Code:</p>
        <pre v-highlightjs><code class="html">&lt;fire-html
  firebaseReference=&quot;ref(&apos;body2&apos;)&quot;
  customTag=&quot;p&quot;
  :editable=&quot;editable&quot;
  :async=&quot;true&quot;
&gt;&lt;/fire-html&gt;</code></pre>

        <hr style="margin-top: 20px; margin-bottom: 20px;">
        <button @click="toggleEdit" class="btn right waves-effect waves-light blue lighten-2 white-text">Toggle Editing</button>
        <h5 style="margin-bottom: 25px;">Try It:</h5>
    
        <fire-html
          :firebaseReference="ref('body2')"
          customTag="p"
          :editable="editable"
          :async="true"
        ></fire-html>
    
        <blockquote>
        The value is <fire-text class="red-text" :firebaseReference="ref('body2')" customTag="span"></fire-text>
        </blockquote>
      </div>
    </div>

    <!--
    <p v-if="editable">
      MAGIC NUMBER:
      <fire-text
        :firebaseReference="ref('magicNumber')"
        customTag="span"
        :editable="editable"
        dataType="number"
      ></fire-text>
    </p>

    <p v-if="editable">
      PICK YOUR URL https://some_url.com/
      <fire-text
        :firebaseReference="ref('slug')"
        customTag="span"
        :editable="editable"
        dataType="slug"
      ></fire-text>
    </p>

    <p>
    The magic number * 2 = {{ doubled }}
    </p>

    <fire-html
      :firebaseReference="ref('title')"
      customTag="h2"
      :editable="editable"
    ></fire-html>

    <fire-html
      :defaultValue="body"
      :firebaseReference="ref('body')"
      customTag="p"
      :editable="editable"
    ></fire-html>

    <fire-text
      :firebaseReference="ref('postnote')"
      customTag="span"
      :editable="editable"
      style="color: red"
      :async="true"
    ></fire-text>

    <pre>{{ database }}</pre>
    -->
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
      editable: false,
      body: null,
      database: null,
      doubled: 0
    }
  },
  mounted () {
    window['$']('.collapsible').collapsible()
    this.rootReference.child('body').on('value', snapshot => {
      this.body = snapshot.val()
    })
    this.rootReference.on('value', snapshot => {
      this.database = snapshot.val()
    })
    this.rootReference.child('magicNumber').on('value', snapshot => {
      this.doubled = snapshot.val() * 2
    })
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
