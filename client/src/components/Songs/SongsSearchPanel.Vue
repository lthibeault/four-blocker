<template>
  <panel title="Search">
    <v-text-field name="search"
     label="Search by Song Title, Album, Artist or Genre"
      v-model="search"
       class="input-group--focused"></v-text-field>

  </panel>
</template>

<script>
import _ from 'lodash'
export default {

  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {search: this.search}
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
