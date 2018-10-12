<template>
  <v-layout>
    <v-flex xs4>
      <panel title= "Song MetaData" >
        <form>
          <v-text-field :rules="[rules.required]" required name="title" label="Title" v-model="song.title" class="input-group--focused" autocomplete="title"></v-text-field>
          <v-text-field :rules="[rules.required]" required name="artist" label="Artist" v-model="song.artist" class="input-group--focused" autocomplete="artist"></v-text-field>
          <v-text-field :rules="[rules.required]" required name="album" label="Album" v-model="song.album" class="input-group--focused" autocomplete="album"></v-text-field>
          <v-text-field :rules="[rules.required]" required name="genre" label="Genre" v-model="song.genre" class="input-group--focused" autocomplete="genre"></v-text-field>
          <v-text-field :rules="[rules.required]" required name="albumImage" label="albumImage" v-model="song.albumImage" class="input-group--focused" autocomplete="albumImage"></v-text-field>
          <v-text-field :rules="[rules.required]" required name="youtubeId" label="youtubeId" v-model="song.youtubeId" class="input-group--focused" autocomplete="youtubeId"></v-text-field>
        </form>
      </panel>
    </v-flex>
    <v-flex xs8 class="ml-2">
      <panel title="Song Structure">
        <v-text-field :rules="[rules.required]" required multi-line name="lyrics" label="lyrics" v-model="song.lyrics" class="input-group--focused" autocomplete="lyrics"></v-text-field>
        <v-text-field :rules="[rules.required]" required multi-line name="tab" label="tab" v-model="song.tab" class="input-group--focused" autocomplete="tab"></v-text-field>
      </panel>
      <div>
        <v-alert class="ml-4" :value="error" transition="scale-transition" error>
          {{error}}
        </v-alert>
      </div>
      <v-btn class="cyan" dark @click="save">Save Song</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import SongsService from '@/services/SongsService'

export default {

  data () {
    return {
      error: null,
      song: {},
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    async save () {
      this.error = null
      const formComplete = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!formComplete) {
        this.error = 'Please fill in all the required Fields'
        return
      }
      try {
        // Backend request to Create Song Data in Database
        await SongsService.put(this.song)
        this.$router.push(`/song/${this.song.id}`)
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      // Backend request to populate Song Data
      const songId = this.$store.state.route.params.songID
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
<!-- Add  scoped  attribute to limit CSS to this component only -->
<style scoped>

</style>
