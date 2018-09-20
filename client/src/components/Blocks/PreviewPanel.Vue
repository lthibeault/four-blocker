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
            <td>{{ props.item.customerName }}</td>
            <td class="text-xs-center">{{ props.item.kpi }}</td>
            <td class="text-xs-center">{{ props.item.target }}</td>
            <td class="text-xs-center">{{ props.item.actual }}</td>
            <td class="text-xs-center">{{ props.item.userFirst }} {{ props.item.userLast }}</td>
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
              <td>{{ props.item.customerName }}</td>
              <td class="text-xs">{{ props.item.description }}</td>
              <td class="text-xs">{{ props.item.userFirst }} {{ props.item.userLast }}</td>
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
              <td>{{ props.item.customerName }}</td>
              <td class="text-xs">{{ props.item.target }}</td>
              <td class="text-xs">{{ props.item.description }}</td>
              <td class="text-xs">{{ props.item.userFirst }} {{ props.item.userLast }}</td>
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
                <td>{{ props.item.customerName }}</td>
                <td class="text-xs">{{ props.item.target }}</td>
                <td class="text-xs">{{ props.item.description }}</td>
                <td class="text-xs">{{ props.item.userFirst }} {{ props.item.userLast }}</td>
              </template>
            </v-data-table>
          </div>
        </v-flex>
      </v-layout>
    </div>
</template>

<script>
import PerformancesService from '@/services/PerformancesService'
import RisksService from '@/services/RisksService'
import MilestonesService from '@/services/MilestonesService'
import AccomplishmentsService from '@/services/AccomplishmentsService'
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
    }
  },
  async mounted () {
    this.performances = (await PerformancesService.index()).data
    this.accomplishments = (await AccomplishmentsService.index()).data
    this.risks = (await RisksService.index()).data
    this.milestones = (await MilestonesService.index()).data
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
