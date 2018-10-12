<template>
      <div class="song">
      <v-layout>
          <v-flex xs 8>
            <div>
              <v-toolbar flat dark>
                <v-toolbar-title dark>Milestones</v-toolbar-title>
                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
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
                            <v-flex xs12 sm12 md12>
                            <v-text-field  label="Target" outline number v-model="newEntry.target"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-textarea  label="Description" outline number v-model="newEntry.description"></v-textarea>
                            </v-flex>
                          </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="sendMilestone(newEntry)">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-data-table
                dark
                :headers="headers"
                :items="milestones"
                item-key="milestoneId"
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.Customer.name }}</td>
                  <td class="text-xs">{{ props.item.Block.target }}</td>
                  <td class="text-xs">{{ props.item.Block.entry }}</td>
                  <td class="text-xs">{{ props.item.User.first }} {{ props.item.User.last }}</td>
                  <td class="justify layout px-0">
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
import MilestonesService from '@/services/MilestonesService'
import BlocksService from '@/services/BlocksService'

import CustomersService from '@/services/CustomersService'
import {mapState} from 'vuex'

export default {
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
    }
  },
  created () {
    this.initialize()
  },
  data () {
    return {
      dialog: false,
      milestones: [],
      newEntry: {},
      customers: null,
      headers: [
        { text: 'Customer', value: 'customer', align: 'center' },
        { text: 'Target', value: 'target', align: 'center' },
        { text: 'Description', value: 'description', align: 'center' },
        { text: 'Name', value: 'actual', align: 'center' }
      ],
      editedIndex: -1,
      defaultItem: {}
    }
  },
  methods: {
    async sendMilestone (item) {
      const data = {description: item.description, CustomerId: item.customerId, level: this.user.RoleId, ReportId: this.report.id}
      await MilestonesService.post(data)
      this.milestones = (await MilestonesService.index()).data
      this.close()
    },
    async initialize () {
      this.milestones = (await BlocksService.index(2)).data
      this.customers = (await CustomersService.show('1')).data
    },
    async deleteItem (item) {
      console.log(item)
      confirm('Are you sure you want to delete this item?') && await MilestonesService.delete(item.milestoneId)
      this.milestones = (await MilestonesService.index()).data
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
