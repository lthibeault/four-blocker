<template>
  <div>
    <v-layout>
      <v-flex xs4 class="mr-2">
        <panel title="Manage">
          <v-list two-line>
          <template v-for="(item) in list" >

            <v-list-tile :key="item.index" avatar @click="setPage(item.name)">
               <v-list-tile-avatar>
                 <v-icon>{{item.icon}}</v-icon>
               </v-list-tile-avatar>
               <v-list-tile-content>
                 <v-list-tile-title v-html="item.name"></v-list-tile-title>

               </v-list-tile-content>
             </v-list-tile>
         </template>

          </v-list>
        </panel>
      </v-flex>

      <v-flex xs8 class="mr-2">
          <customer-data v-if="page === 'Customers'"></customer-data>
          <team-data v-if="page === 'Teams'"></team-data>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '@/services/UserService'
import TeamsService from '@/services/TeamsService'
import CustomerData from './Customer'
import TeamData from './Team'

export default {
  components: {
    CustomerData, TeamData
  },
  computed: {
    ...mapState([
      'isUserLoggedIn', 'user'
    ])
  },
  methods: {
    async initialize () {
      this.users = (await UserService.index()).data
      this.teams = (await TeamsService.index()).data
    },
    setPage (item) {
      this.page = item
    }
  },
  data () {
    return {
      page: null,
      list: [
        // {name: 'Users', icon: 'person'},
        {name: 'Teams', icon: 'people'},
        {name: 'Customers', icon: 'store'}
      ],
      users: [],
      teams: [],
      dialog: false,
      mySupervisor: null,
      reportsTo: null,
      teamHeaders: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Role', value: 'role' },
        { text: 'edit', value: 'edit' }
      ],
      headers: [

        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Role', value: 'role' },
        { text: 'Title', value: 'title' },
        { text: 'edit', value: 'edit' }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }
  },
  created () {
    this.initialize()
    // this.getReporter()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
