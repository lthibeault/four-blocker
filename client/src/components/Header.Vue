<template>
<v-layout>
  <v-toolbar fixed class="blue" dark>
    <v-toolbar-title class="mr-4">
      <v-container>
        <v-layout justify-center>
          <v-btn v-if="$store.state.isUserLoggedIn" color="light-green" dark @click.stop="drawer = !drawer">
            <v-icon>menu</v-icon>
          </v-btn>
        </v-layout>
      </v-container>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-flex>
        <h1>Landis + Gyr 4-Blocker Portal</h1>
      </v-flex>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat dark :to="{ name: 'login'}" v-if="!$store.state.isUserLoggedIn">Login</v-btn>
      <v-btn flat dark :to="{ name: 'register'}" v-if="!$store.state.isUserLoggedIn">Sign Up</v-btn>
      <v-btn flat dark @click="logout" v-if="$store.state.isUserLoggedIn">Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-layout wrap>
    <v-navigation-drawer v-model="drawer" absolute temporary v-if="$store.state.isUserLoggedIn">
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{user.first}} {{user.last}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile to="/home">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <v-list-group prepend-icon="account_circle" value="true">
          <v-list-tile slot="activator">
            <v-list-tile-title>User</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-for="(admin, i) in admins" :key="i" :to="admin.name">
            <v-list-tile-title v-text="admin.title">
            </v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="admin.icon"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        <v-list-group prepend-icon="dashboard" value="true">
          <v-list-tile slot="activator">
            <v-list-tile-title>Blocks</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(item, i) in items"
            :key="i"
            :to="item.name">
            <v-list-tile-title v-text="item.title">
            </v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        <v-list-group prepend-icon="dashboard" value="true">
          <v-list-tile slot="activator">
            <v-list-tile-title>Review/Submit</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(item, i) in otherItems"
            :key="i"
            :to="item.name">
            <v-list-tile-title v-text="item.title">
            </v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</v-layout>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  computed: {
    ...mapState([
      'isUserLoggedIn', 'user'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setReport', null)
      this.$router.push({
        name: '/home'
      })
    }
  },
  data () {
    return {
      admins: [{
        title: 'Profile',
        icon: 'face',
        name: '/profile'
      },
      {
        title: 'Settings',
        icon: 'settings',
        name: '/settings'
      },
      {
        title: 'Admin',
        icon: 'build',
        name: '/admin'
      }],
      drawer: null,
      items: [{
        title: 'KPI',
        icon: 'dashboard',
        name: '/blocks/KPI'
      },
      {
        title: 'Accomplishment',
        icon: 'dashboard',
        name: '/blocks/Accomplishments'
      },
      {
        title: 'Milestone',
        icon: 'dashboard',
        name: '/blocks/Milestones'
      },
      {
        title: 'Risk',
        icon: 'dashboard',
        name: '/blocks/Risks'
      }
      ],
      otherItems: [
        {
          title: 'Preview/Send',
          icon: 'send',
          name: '/preview'
        },
        {
          title: 'History',
          icon: 'history',
          name: '/history'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  curser: pointer;
}

.home:hover {
  color: #E9E;
}
</style>
