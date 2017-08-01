<template>
  <div id="app">
    <v-app>
      <v-app id="example-2" standalone>
        <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow>
          <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile avatar tag="div">
                <v-list-tile-avatar>
                  <img src="https://vuejs.org/images/logo.png" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Menu</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click.native.stop="mini = !mini">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile v-for="item in items" :key="item.title">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <router-link :to="item.link">{{ item.title }}</router-link>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed class="indigo darken-4" dark>
          <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title>FireComponents</v-toolbar-title>
        </v-toolbar>
        <main>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'dashboard', link: '/' },
        { title: 'Demo', icon: 'question_answer', link: '/demo' }
      ],
      mini: false,
      right: null
    }
  }
}
</script>
