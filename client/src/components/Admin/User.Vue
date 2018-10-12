<template>
  <div>
    <panel :title="title">
      <panel title="Current Info" class="mb-2">
        Supervisor: {{ supervisor.first}} {{supervisor.last}} <br />
        Role: {{ user.Role.name}}<br />
      </panel>
      <center>
      <v-form>
        <v-flex xs12 sm6 d-flex>
          <v-select
            :items="users"
            v-model="user.nextLevel"
            item-text="fullName"
            item-value="id"
            label="Supervisor"
            :placeholder="supervisor.first + ' ' + supervisor.last"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6 d-flex>
          <v-select
            :items="roles"
            item-text="name"
            v-model="user.RoleId"
            item-value="id"
            label="Roles"
            :placeholder="user.Role.name"
          ></v-select>
        </v-flex>
        <v-btn @click.stop="updateUser">Update</v-btn>  <v-btn @click.stop="getUser()">Cancel</v-btn>
      </v-form>
      </center>
    </panel>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
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
    this.getRoles()
    this.getUsers()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
