<template>
  <div id="app">
    <v-app>
      <page-header></page-header>
      <v-container fluid>
        <div v-if="report" class="mb-2">
          <h2>Current Report:</h2>
          <h2> {{ monthNames[report.month]}} - {{report.year}}</h2>
        </div>
        <!-- TODO: Include a "Report Picker"  -->
        <div v-if="checkReport" class="mb-2">
            <v-alert :value="checkReport" type="error">
               You must Select your First Report Month & Year before continuing!
             </v-alert>
             <v-form>
               <v-layout>
                 <v-flex row-wrap>
                   <v-select xs6 :items="months" label="Month" item-text="name" item-value="id" v-model="newReport.newMonth"></v-select>
                   <v-text-field number xs6 label="Year" v-model="newReport.newYear"></v-text-field>
                   <v-btn v-if="newReport.newMonth && newReport.newYear" color="green" @click="setReport"><v-icon>send</v-icon></v-btn>
                 </v-flex>
               </v-layout>
             </v-form>
        </div>
      <router-view />
      </v-container>
    </v-app>
    <!-- <img src="./assets/logo.png"> -->
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import ReportsService from '@/services/ReportsService'
import {mapState} from 'vuex'

export default {
  name: 'App',
  components: {
    PageHeader
  },
  computed: {
    ...mapState([
      'isUserLoggedIn', 'report', 'user'
    ])
  },
  data () {
    return {
      reports: [{month: 10, year: 2018}],
      checkReport: null,
      newReport: {},
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      months: [
        {name: 'Jan', id: 0},
        {name: 'Feb', id: 1},
        {name: 'Mar', id: 2},
        {name: 'Apr', id: 3},
        {name: 'May', id: 4},
        {name: 'June', id: 5},
        {name: 'July', id: 6},
        {name: 'Aug', id: 7},
        {name: 'Sep', id: 8},
        {name: 'Oct', id: 9},
        {name: 'Nov', id: 10},
        {name: 'Dec', id: 11}
      ]
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    async initialize () {
      if (this.isUserLoggedIn) {
        this.reports = (await ReportsService.index()).data
        this.$store.dispatch('setReport', this.reports[0])
        if (this.reports.length === 0) {
          this.checkReport = true
        } else { this.checkReport = false }
      }
    },
    async setReport () {
      console.log(this.newReport)
      this.newReport.UserId = this.user.id
      await ReportsService.put(this.newReport)
      this.initialize()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
