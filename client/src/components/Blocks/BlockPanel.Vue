<template>
      <div class="song">
      <v-layout>
          <v-flex xs 8>
            <div>
              <v-toolbar flat dark>
                <v-toolbar-title dark>{{ blockName }}</v-toolbar-title>
                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-if="blockName === 'KPI'" v-model="dialog" max-width="500px">
                  <v-btn slot="activator" color="primary" dark class="mb-2"><v-icon ripple>add</v-icon></v-btn>
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
                            <v-flex v-if="blockName === 'KPI'" xs12 sm6 md4>
                              <v-select v-if="agreements" :items="agreements"  label="KPI" item-text="kpi" item-value="id" v-model="newEntry.target" outline @change="getDetails" return-object></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-text-field v-if="newEntry.target" label="Target" v-model="newEntry.target.target" disabled></v-text-field>
                            </v-flex>
                              <v-flex xs12 sm6 md4>
                              <v-text-field v-if="newEntry.target" label="Actual" outline number v-model="newEntry.entry"></v-text-field>
                            </v-flex>
                          </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="sendBlock()">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-if="blockName !== 'KPI'" v-model="dialog" max-width="500px">
                  <v-btn slot="activator" color="primary" dark class="mb-2"><v-icon ripple>add</v-icon></v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                              <v-select :items="customers" label="Customer" item-text="name" item-value="id" v-model="newEntry.customerId" outline></v-select>
                            </v-flex>
                            <v-flex xs12 sm12 md12 v-if="blockName === 'Milestones'">
                            <v-text-field  label="Target" outline number v-model="newEntry.estimate"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-textarea  label="Description" outline number v-model="newEntry.entry"></v-textarea>
                            </v-flex>
                          </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="sendBlock()">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-data-table
                dark
                :headers="headers"
                :items="blockData"
                item-key="blockDataId"
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.Customer.name }}</td>
                  <td v-if="blockName === 'KPI'" class="text-xs">{{ props.item.Agreement.kpi }}</td>
                  <td v-if="blockName === 'KPI'" class="text-xs">{{ props.item.Agreement.target }}</td>
                  <td v-if="blockName === 'Milestones'" class="text-xs">{{ props.item.Block.target }}</td>
                  <td class="text-xs">{{ props.item.Block.entry }}</td>
                  <td class="text-xs">{{ props.item.Block.User.first }} {{ props.item.Block.User.last }}</td>
                  <td class="justify layout px-0">
                    <v-icon small color="red" @click="deleteItem(props.item)">delete</v-icon>
                  </td>
                </template>
              </v-data-table>
            </div>
          </v-flex>

        </v-layout>
        <v-layout class=" mt-2">
          <v-flex>

            <v-toolbar flat dark>
              <v-toolbar-title dark>My Teams {{ blockName }}</v-toolbar-title>
              <v-divider
                class="mx-2"
                inset
                vertical
              ></v-divider>
            </v-toolbar>
            <v-data-table
              dark
              :headers="headers"
              :items="reporteeData"
              item-key="reporteeDataId"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.Customer.name }}</td>
                <td v-if="blockName === 'KPI'" class="text-xs">{{ props.item.Agreement.kpi }}</td>
                <td v-if="blockName === 'KPI'" class="text-xs">{{ props.item.Agreement.target }}</td>
                <td v-if="blockName === 'Milestones'" class="text-xs">{{ props.item.Block.target }}</td>
                <td class="text-xs">{{ props.item.Block.entry }}</td>
                <td class="text-xs">{{ props.item.Block.User.first }} {{ props.item.Block.User.last }}</td>
                <td class="justify layout px-0">
                  <v-icon small color="green" @click="addItem(props.item)">add</v-icon>
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </div>
</template>

<script>
import BlocksService from '@/services/BlocksService'
import CustomersService from '@/services/CustomersService'
import AgreementsService from '@/services/AgreementsService'
import {mapState} from 'vuex'

export default {
  props: ['blockName'],
  computed: {
    ...mapState([
      'isUserLoggedIn', 'user', 'report'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    '$route': 'initialize'
  },
  created () {
    this.initialize()
  },
  data () {
    return {
      dialog: false,
      blockData: [
        {
          Customer: {},
          Block: {
            User: {}
          },
          User: {},
          Agreement: {}
        }
      ],
      newEntry: {},
      agreements: [],
      customers: [],
      headers: [
        { text: 'Customer', value: 'customer', align: 'center' },
        { text: 'Description', value: 'description', align: 'center' },
        { text: 'Name', value: 'actual', align: 'center' }
      ],
      editedIndex: -1,
      defaultItem: {},
      blockTypeId: null,
      reporteeData: [
        {
          Customer: {},
          Block: {
            User: {}
          },
          User: {},
          Agreement: {}
        }
      ],
      sentItem: {}
    }
  },
  methods: {
    async refreshData () {
      this.blockData = (await BlocksService.index(this.blockName)).data
      this.reporteeData = (await BlocksService.reportee(this.blockName)).data
    },
    async addItem (item) {
      this.sentItem.BlockId = item.BlockId
      this.sentItem.AgreementId = item.AgreementId
      this.sentItem.UserId = this.user.id
      this.sentItem.BlockTypeId = item.BlockTypeId
      this.sentItem.ReportId = this.report.id
      this.sentItem.CustomerId = item.CustomerId
      await BlocksService.link(this.sentItem)
      this.refreshData()
    },
    async  getDetails () {
      this.agreements = (await AgreementsService.index(this.newEntry.customerId)).data
    },
    async sendBlock () {
      // console.log(this.newEntry)
      await BlocksService.post(this.newEntry)
      this.blockData = (await BlocksService.index(this.blockName)).data
      this.close()
    },
    async initialize () {
      if (this.blockName === 'KPI') {
        this.blockTypeId = 1
      } else if (this.blockName === 'Milestones') {
        this.blockTypeId = 2
      } else if (this.blockName === 'Risks') {
        this.blockTypeId = 3
      } else if (this.blockName === 'Accomplishments') {
        this.blockTypeId = 4
      }
      this.newEntry.reportId = this.report.id
      this.newEntry.blockTypeId = this.blockTypeId
      // this.blockData = (await BlocksService.index(this.blockName)).data
      // this.reporteeData = (await BlocksService.reportee(this.blockName)).data
      this.blockData = [
        {
          Customer: {},
          Block: {
            User: {}
          },
          User: {},
          Agreement: {}
        }
      ]
      // if (this.blockName === 'KPI') {
      //   this.agreements = (await AgreementsService.index(this.newEntry.customerId)).data
      // }
      this.refreshData()
      this.customers = (await CustomersService.show('1')).data
      if (this.blockName === 'KPI') {
        this.headers = [
          { text: 'Customer', value: 'customer', align: 'center' },
          { text: 'Kpi', value: 'kpi', align: 'center' },
          { text: 'Target', value: 'target', align: 'center' },
          { text: 'Description', value: 'description', align: 'center' },
          { text: 'Name', value: 'actual', align: 'center' }
        ]
      } else if (this.blockName === 'Milestones') {
        this.headers = [
          { text: 'Customer', value: 'customer', align: 'center' },

          { text: 'Target', value: 'target', align: 'center' },
          { text: 'Description', value: 'description', align: 'center' },
          { text: 'Name', value: 'actual', align: 'center' }
        ]
      } else {
        this.headers = [
          { text: 'Customer', value: 'customer', align: 'center' },
          { text: 'Description', value: 'description', align: 'center' },
          { text: 'Name', value: 'actual', align: 'center' }
        ]
      }
      this.reporteeData = [
        {
          Customer: {},
          Block: {
            User: {}
          },
          User: {},
          Agreement: {}
        }
      ]
    },
    async deleteItem (item) {
      console.log(item)
      // confirm('Are you sure you want to delete this item?') &&
      await BlocksService.delete(item.id)
      this.refreshData()
      // this.blockData = (await BlocksService.index(this.blockName)).data
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.newEntry = Object.assign({ reportId: this.report.id, blockTypeId: this.blockTypeId }, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
  padding:20px;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
    font-size: 18px;
  }

.album-image{

  height:50%;
  margin: 0 auto;
}
</style>
