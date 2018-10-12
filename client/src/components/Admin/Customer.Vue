<template>
  <div>
    <panel title="Customer Data">
      <v-flex>
        <v-form>
          <v-flex xs12 sm6 d-flex>
            <v-text-field label="Enter New Customer" v-model="newCustomer"></v-text-field>
          </v-flex>
          <v-btn @click.stop="sendCustomer">Submit</v-btn>
          <v-btn @click.stop="newCustomer = null">Cancel</v-btn>
        </v-form>
      </v-flex>
      <v-layout>
        <v-flex>
          <v-list two-line>
            <template v-for="(item) in customers">

              <v-list-tile :key="item.index" avatar>
                 <v-list-tile-content>
                   <v-list-tile-title v-html="item.name"></v-list-tile-title>
                   <!-- <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title> -->
                 </v-list-tile-content>
               </v-list-tile>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </panel>
  </div>
</template>

<script>
import CustomersService from '@/services/CustomersService'
import _ from 'lodash'

export default {
  data () {
    return {
      customers: {},
      newCustomer: null
    }
  },
  methods: {
    async sendCustomer () {
      await CustomersService.post(this.newCustomer)
      this.getCustomers()
      this.newCustomer = null
    },
    async getCustomers () {
      this.customers = (await CustomersService.index()).data
    }
  },
  created () {
    this.getCustomers()
  },
  watch: {
    newCustomer: _.debounce(async function (value) {
      if (this.newCustomer !== '') {
        this.customers = (await CustomersService.index(this.newCustomer)).data
      } else {
        this.customers = (await CustomersService.index()).data
      }
    }, 700)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
