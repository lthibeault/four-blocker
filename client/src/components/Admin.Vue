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
            <td class="text-xs">{{ props.item.name }}</td>
            <td class="text-xs">{{ props.item.role }}</td>
            <td class="text-xs">{{ props.item.nextLevel }}</td>

            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
          </template>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </panel>
      <panel title="Teams">

      </panel>
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
      this.users = (await UserService.index()).data
    }
  },
  data () {
    return {
      users: [],
      dialog: false,
      mySupervisor: null,
      objArray: [
        { id: 0, name: 'Object 0', otherProp: '321' },
        { id: 1, name: 'O1', otherProp: '648' },
        { id: 2, name: 'Another Object', otherProp: '850' },
        { id: 3, name: 'Almost There', otherProp: '046' },
        { id: 4, name: 'Last Obj', otherProp: '984' }
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
        { text: 'Next Level', value: 'reportTo' }
      ],
      desserts: [],
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
    this.getReporter()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
