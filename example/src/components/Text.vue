<template lang="pug">
  v-container
    v-layout.mt-3(row, wrap)
      v-flex.mb-4(xs12 md10 offset-md1)
        v-card
          v-card-text
            // | <pre class="headline" v-highlightjs="dbValue"><code class="json"></code></pre>
            pre.headline(v-highlightjs="dbValue")
              code.json
            //
              h3.display-2.text-xs-center
                | Database value is:
                |  
                span.display-2 {{ dbValue }}

      v-flex(xs12 md10 offset-md1)
        v-card
          v-card-title.blue.white--text(primary-title)
            v-layout(row, wrap)
              v-flex(xs12)
                h3.mb-0.white--text(xs12) FireText Demo
              v-flex(xs12)
                .subheading Bind Single line text to a firebase reference

            v-spacer.text-xs-right
              div(v-if="editable")
                v-btn(@click="toggleEdit") Stop Editing
                v-btn(@click="resetData") Reset
                v-btn(@click="saveData") Save
              div(v-else)
                v-btn.white.blue--text(icon, fab, @click="toggleEdit")
                  v-icon mode_edit
                v-btn.white.blue--text(icon, fab, @click="toggleCode")
                  v-icon code

          v-card-text
            v-layout(row, wrap)
              v-flex.mb-4(xs12 v-if="showCode")
                pre.headline(v-highlightjs="true")
                  code.html
                    | &ltfire-text
                    |   :firebaseReference="dbRef.child('fire-text-page')"
                    |   customTag="h3"
                    |   :editable="editable"
                    |   :async="false"
                    |  /&gt

              v-flex(xs12)
                fire-text.text-xs-center(
                  path="/fire-text-page"
                  customTag="h3"
                  :editable="editable"
                  :async="false"
                )

      v-flex.mt-5(xs12 md10 offset-md1)
        hr.grey.lighten-5

      v-flex.mt-3(xs12 md10 offset-md1)
        h3 API

      v-flex.mt-3(xs12 md10 offset-md1)
        v-data-table.elevation-1(
          hide-actions
          :headers="headers"
          :items="items"
        )
          template(slot="items" scope="props")
            td {{ props.item.title }}
            td {{ props.item.type }}
            td {{ props.item.default }}
            td {{ props.item.description }}

</template>
</v-data-table>
</template>

</template>

<script>
import Messanger from '../lib/FireMessanger'
import firebase from '../firebase'

export default {
  name: 'app',
  data () {
    return {
      dbRef: firebase.database().ref(),
      dbValue: null,
      editable: true,
      showCode: false,
      headers: [
        { text: 'Title', align: 'left', value: 'title' },
        { text: 'Type', align: 'left', value: 'type' },
        { text: 'Default', align: 'left', value: 'default' },
        { text: 'Description', align: 'left', value: 'description' },
      ],
      items: [
        {
          title: "customTag",
          type: "String",
          default: "p",
          description: "The tag the created element will be"
        },
        {
          title: "async",
          type: "Boolean",
          default: "false",
          description: "Sets two way binding to firebase. If false, you will need to save using the FireMessanger instance"
        },
      ],
    }
  },
  mounted () {
    this.dbRef.child('fire-text-page').on('value', (snapshot) => {
      this.dbValue = `{\n  \"value\": \"${snapshot.val()}\"\n }`
    })
  },
  methods: {
    toggleCode () {
      this.showCode = !this.showCode
    },
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
}
</script>
