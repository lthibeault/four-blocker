<template>
  <div v-if="isUserLoggedIn" class="hello">
  <div class="mt-2">
<h1> My Teams Status</h1>
    <v-btn v-for="(reportee, index) in reportees" round  :key="index" :color="getColor(reportee.status)">{{reportee.User.first}} {{reportee.User.last}}</v-btn>
  </div>
  </div>
  <div v-else>
    Please Log in to View or Enter Data
  </div>
</template>

<script>
import ReportsService from '@/services/ReportsService'
import {mapState} from 'vuex'

export default {
  name: 'HelloWorld',
  computed: {
    ...mapState([
      'isUserLoggedIn', 'report'
    ])
  },
  data () {
    return {
      reportees: null
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.reportees = (await ReportsService.reportee()).data
    },
    getColor (status) {
      // console.log(status)
      if (status === 'Complete') {
        return 'green'
      } else {
        return 'red'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
