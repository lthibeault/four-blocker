<template>
  <div id="app">
    <v-app>
      <page-header></page-header>
      <v-container fluid>
        <div>
          <h2>Current Report:</h2>
                   <h2> {{ monthNames[report.month]}} - {{report.year}}</h2>
        </div>
        <!-- TODO: Include a "Report Picker"  -->
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
      'isUserLoggedIn', 'report'
    ])
  },
  data () {
    return {
      reports: [{month: 10, year: 2018}],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.reports = (await ReportsService.index()).data
      this.$store.dispatch('setReport', this.reports[0])
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
