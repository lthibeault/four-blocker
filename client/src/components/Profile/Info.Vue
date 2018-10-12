<template>
  <div>
    <panel title="My Info">
      Show My Data here, with Edit Options for specific Locations/Data Sets
    </panel>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import TeamsService from '@/services/TeamsService'
import RolesService from '@/services/RolesService'

export default {
  data () {
    return {
      user: {
        first: null,
        last: null,
        Team: {},
        Role: {}
      },
      supervisor: {
        first: null,
        last: null
      },
      users: [],
      teams: [],
      roles: [],
      title: null
    }
  },
  methods: {
    async getUser () {
      this.user = (await UserService.show(this.$route.params.userId)).data
      this.title = 'Manage User: ' + this.user.first + this.user.last
      this.getSuper()
    },
    async getUsers () {
      this.users = (await UserService.index()).data
    },
    async getSuper () {
      this.supervisor = (await UserService.show(this.user.nextLevel)).data
    },
    async getTeams () {
      this.teams = (await TeamsService.index()).data
    },
    async getRoles () {
      this.roles = (await RolesService.index()).data
    },
    async updateUser () {
      await UserService.put(this.user)
      this.getUser()
    }

  },
  created () {
    this.getUser()
    this.getTeams()
    this.getRoles()
    this.getUsers()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
