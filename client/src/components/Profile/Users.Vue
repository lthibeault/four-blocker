<template>
  <div>
    <panel title="My Users">
      <v-data-table
        :headers="headers"
        :items="users"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.first }} {{ props.item.last }}</td>
          <td class="text-xs">{{ props.item.Role.name }}</td>
          <td class="text-xs">{{ user.first }} {{ user.last }}</td>
          <td class="justify-center layout px-0">
            <v-btn flat :to="{ name: '/manageUser', params:{ userId: props.item.id }}">
              <v-icon small class="mr-2">
                edit
              </v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </panel>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '@/services/UserService'

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
      this.users = (await UserService.reportee()).data
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
        { text: 'Report To', value: 'reportto' },
        { text: 'Edit', value: 'edit' }
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
