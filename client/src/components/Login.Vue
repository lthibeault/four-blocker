<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
    <panel title="Login">
      <form>
        <v-text-field name="email" label="email" v-model="email" class="input-group--focused" autocomplete="email"></v-text-field>
        <br />
        <v-text-field v-model="password" :type="show ? 'text' : 'password'" :append-icon="show ? 'visibility_off' : 'visibility'"  @click:append="show = !show" :rules="[rules.required, rules.min]" name="password" label="Password" hint="At least 8 characters" autocomplete="new-password"></v-text-field>
        <br />
        <div>
          <v-alert class="ml-4" :value="error" transition="scale-transition" error>
            {{error}}
          </v-alert>
        </div>
        <br  />
        <v-btn class="cyan" dark @click="login">login</v-btn>
      </form>
    </panel>
  </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      show: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({name: 'songs'})
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
