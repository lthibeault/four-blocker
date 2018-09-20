<template>

<div>
  <h2>Current Report:</h2>
           <h2> {{ monthNames[report[0].month]}} - {{report[0].year}}</h2>
</div>

</template>

<script>
import ReportsService from '@/services/ReportsService'

export default {
  // props: [
  //   'report'
  // ],
  data () {
    return {
      report: [{
        month: 9,
        year: 1978
      }],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
