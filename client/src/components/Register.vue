<template>
  <v-layout>
  <v-flex xs6 offset-xs3>
      <panel title="Register">
        <form>
          <div class="pl-4 pr-4 pt-2 pb-2 ">
            <v-text-field name="email" label="Email" v-model="email" class="input-group--focused"></v-text-field>
            <br />
            <v-text-field v-model="password" :type="show ? 'text' : 'password'" :append-icon="show ? 'visibility_off' : 'visibility'"  @click:append="show = !show" :rules="[rules.required, rules.min]" name="password" label="Password" hint="At least 8 characters" autocomplete="new-password"></v-text-field>
            <br />
            <div>
              <v-alert class="ml-4" :value="error" transition="scale-transition" error>
                {{error}}
              </v-alert>
            </div>
            <br  />
            <v-btn class="cyan" dark @click="register">Register</v-btn>
          </div>
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
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', 'token')
        this.$store.dispatch('setUser', 'user')
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
