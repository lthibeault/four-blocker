<template>
  <div>
    <v-btn color="green" @click.stop="sendReport">Submit Report</v-btn>
    <v-layout row wrap justify-center>
      <v-flex xs5 mr-2 offset-1>
        <v-toolbar flat dark>
          <v-toolbar-title dark>KPI's</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table dark :headers="performanceHeaders" :items="performances" item-key="performanceId" class="elevation-1" text-center>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.Customer.name }}</td>
            <td class="text-xs-center">{{ props.item.Agreement.kpi }}</td>
            <td class="text-xs-center">{{ props.item.Agreement.target }}</td>
            <td class="text-xs-center">{{ props.item.Block.entry }}</td>
            <td class="text-xs-center">{{ props.item.Block.User.first }} {{ props.item.Block.User.last }}</td>
          </template>
        </v-data-table>
        </v-flex>
        <v-flex xs5>
          <v-toolbar flat dark>
            <v-toolbar-title dark>Accomplishments</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
            <v-data-table
              dark
              :headers="accomplishmentHeaders"
              :items="accomplishments"
              item-key="accomplishmentId"
              class="elevation-1"
            >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.Customer.name }}</td>
              <td class="text-xs">{{ props.item.Block.entry }}</td>
              <td class="text-xs">{{ props.item.Block.User.first }} {{ props.item.Block.User.last }}</td>
            </template>
          </v-data-table>
        </v-flex>
        <v-flex xs5 mt-2 mr-2>
          <v-toolbar flat dark>
            <v-toolbar-title dark>Milestones</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-data-table
            dark
            :headers="mileStoneHeaders"
            :items="milestones"
            item-key="milestoneId"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.Customer.name }}</td>
              <td class="text-xs">{{ props.item.Block.target }}</td>
              <td class="text-xs">{{ props.item.Block.entry }}</td>
              <td class="text-xs">{{ props.item.Block.User.first }} {{ props.item.Block.User.last }}</td>
            </template>
          </v-data-table>
        </v-flex>
        <v-flex xs5 mt-2>
          <div>
            <v-toolbar flat dark>
              <v-toolbar-title dark>Risks/Challenges</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-data-table
              dark
              :headers="riskHeaders"
              :items="risks"
              item-key="id"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.Customer.name }}</td>
                <td class="text-xs">{{ props.item.Block.entry }}</td>
                <td class="text-xs">{{ props.item.Block.User.first }} {{ props.item.Block.User.last }}</td>
              </template>
            </v-data-table>
          </div>
        </v-flex>
      </v-layout>
    </div>
</template>

<script>
import BlocksService from '@/services/BlocksService'
import ReportsService from '@/services/ReportsService'

import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState([
      'isUserLoggedIn', 'report'
    ])
  },
  methods: {
    next () {
      const month = parseInt(this.report.month)
      this.report.newYear = (month < 11 ? this.report.year : this.report.year + 1)
      this.report.newMonth = (month < 11 ? month + 1 : 0)
    },
    async sendReport () {
      console.log(this.report)
      this.next()
      this.newReport = (await ReportsService.put(this.report)).data
      console.log(this.newReport)
      this.$store.dispatch('setReport', this.newReport)
      this.getCurrentInfo()
    },
    async getCurrentInfo () {
      this.performances = (await BlocksService.index('KPI')).data
      this.accomplishments = (await BlocksService.index('Accomplishments')).data
      this.risks = (await BlocksService.index('Risks')).data
      this.milestones = (await BlocksService.index('Milestones')).data
    }
  },
  async mounted () {
    this.getCurrentInfo()
  },

  data () {
    return {
      performances: [],
      risks: [],
      newReport: [],
      milestones: [],
      accomplishments: [],
      performanceHeaders: [
        { text: 'Customer', value: 'customer' },
        { text: 'Name', value: 'name' },
        { text: 'Target', value: 'target' },
        { text: 'Actual', value: 'actual' },
        { text: 'Name', value: 'actual' }
      ],
      mileStoneHeaders: [
        { text: 'Customer', value: 'customer', align: 'center' },
        { text: 'Target', value: 'target', align: 'center' },
        { text: 'Description', value: 'description', align: 'center' },
        { text: 'Name', value: 'actual', align: 'center' }
      ],
      accomplishmentHeaders: [
        { text: 'Customer', value: 'customer', align: 'center' },
        { text: 'Description', value: 'description', align: 'center' },
        { text: 'Name', value: 'actual', align: 'center' }
      ],
      riskHeaders: [
        { text: 'Customer', value: 'customer', align: 'center' },
        { text: 'Description', value: 'description', align: 'center' },
        { text: 'Name', value: 'actual', align: 'center' }
      ]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
