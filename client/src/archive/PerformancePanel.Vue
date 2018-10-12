<template>
      <div class="song">
      <v-layout>
          <v-flex xs 8>
            <div>
              <v-toolbar flat dark>
                <v-toolbar-title dark>KPI</v-toolbar-title>
                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-btn v-if="this.route.path !== 'preview'" slot="activator" color="primary" dark class="mb-2"><v-icon ripple>add</v-icon></v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                              <v-select :items="customers" label="Customer" item-text="name" item-value="id" v-model="newEntry.customerId" outline @change="getDetails"></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-select v-if="agreements" :items="agreements" label="KPI" item-text="kpi" item-value="id" v-model="newEntry.kpi" outline @change="getDetails" return-object></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-text-field v-if="newEntry.kpi" label="Target" v-model="newEntry.kpi.target" disabled></v-text-field>
                            </v-flex>
                              <v-flex xs12 sm6 md4>
                              <v-text-field v-if="newEntry.kpi" label="Actual" outline number v-model="newEntry.actual"></v-text-field>
                            </v-flex>
                          </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="sendPerformance(newEntry)">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-data-table
                dark
                :headers="headers"
                :items="performances"
                item-key="performanceId"
                class="elevation-1"
                text-center
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.customerName }}</td>
                  <td class="text-xs-center">{{ props.item.kpi }}</td>
                  <td class="text-xs-center">{{ props.item.target }}</td>
                  <td class="text-xs-center">{{ props.item.actual }}</td>
                  <td class="text-xs-center">{{ props.item.userFirst }} {{ props.item.userLast }}</td>
                  <td class="justify-center layout px-0">
                    <v-icon small color="red" @click="deleteItem(props.item)">delete</v-icon>
                  </td>
                </template>
              </v-data-table>
            </div>
          </v-flex>
        </v-layout>
      </div>
</template>

<script>
import PerformancesService from '@/services/PerformancesService'
import BlocksService from '@/services/BlocksService'

import CustomersService from '@/services/CustomersService'
import AgreementsService from '@/services/AgreementsService'
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState([
      'isUserLoggedIn', 'user', 'route', 'report'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
    this.initialize()
  },
  data () {
    return {
      dialog: false,
      performances: [],
      newEntry: {},
      customers: null,
      agreements: null,
      headers: [
        { text: 'Customer', value: 'customer' },
        { text: 'Name', value: 'name' },
        { text: 'Target', value: 'target' },
        { text: 'Actual', value: 'actual' },
        { text: 'Name', value: 'actual' }
      ],
      editedIndex: -1,
      defaultItem: {}
    }
  },
  methods: {
    async  getDetails () {
      this.agreements = (await AgreementsService.index(this.newEntry.customerId)).data
    },
    async sendPerformance (item) {
      console.log(this)
      const data = {UserId: this.user.id, actual: item.actual, AgreementId: item.kpi.id, CustomerId: item.customerId, level: this.user.RoleId, ReportId: this.report.id}
      await PerformancesService.post(data, this.report)
      this.performances = (await PerformancesService.index()).data
      this.close()
    },
    async initialize () {
      this.performances = (await BlocksService.index(1)).data
      this.customers = (await CustomersService.show(this.user.id)).data
    },
    async deleteItem (item) {
      confirm('Are you sure you want to delete this item?') && await PerformancesService.delete(item.performanceId)
      this.performances = (await PerformancesService.index()).data
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.newEntry = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
