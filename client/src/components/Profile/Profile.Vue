<template>
  <div>
    <v-layout>
      <v-flex xs4 class="mr-2">
        <panel title="Manage">
          <v-list two-line>
            <v-list-tile avatar :to="{ name: '/manageUser', params:{ userId: user.id }}">
               <v-list-tile-avatar>
                 <v-icon>build</v-icon>
               </v-list-tile-avatar>
               <v-list-tile-content>
                 <v-list-tile-title>My Info</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>
          <template v-for="(item) in list" >
            <v-list-tile :key="item.index" avatar @click="setPage(item.value)">
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
          <user-data v-if="page === 'User'"></user-data>
          <customer-data v-if="page === 'Customer'"></customer-data>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import CustomerData from './Customer'
import UserData from './Users'
import MyData from '../Admin/User'

export default {
  components: {
    CustomerData, UserData, MyData
  },
  computed: {
    ...mapState([
      'isUserLoggedIn', 'user'
    ])
  },
  methods: {
    setPage (item) {
      this.page = item
    }
  },
  data () {
    return {
      page: null,
      list: [
        // {name: 'My Info', value: 'Info', icon: 'build'},
        {name: 'My Users', value: 'User', icon: 'person'},
        {name: 'My Customers', value: 'Customer', icon: 'store'}
      ]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
