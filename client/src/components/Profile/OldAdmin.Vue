<template>
  <div>
    <panel title="Admin">
      <panel title="Users">
        <v-data-table
          :headers="headers"
          :items="users"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.first }} {{ props.item.last }}</td>
            <td class="text-xs">{{ props.item.role }}</td>
            <td class="text-xs">{{ props.item.Team.name }}</td>
            <td class="justify-center layout px-0">
              <v-btn flat   :to="{ name: 'manageUser', params:{ userId: props.item.id }}"><v-icon
                small
                class="mr-2">
                  edit
              </v-icon></v-btn>
            </td>
          </template>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </panel>
      <panel title="Teams">
        <v-data-table
          :headers="teamHeaders"
          :items="teams"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs">{{ props.item.name }}</td>
            <td class="justify-center layout px-0">
              <v-btn
                flat
                :to="{ name: 'manageUser', params:{ userId: props.item.id }}"
                >
                <v-icon
                  small
                  class="mr-2">
                    edit
              </v-icon>
            </v-btn>
            </td>
          </template>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </panel>
    </panel>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '@/services/UserService'
import TeamsService from '@/services/TeamsService'

export default {
  components: {
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
    }
  },
  data () {
    return {
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
