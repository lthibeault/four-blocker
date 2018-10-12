<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-Data class="mb-2"  :song="song"/>
      </v-flex>
      <v-flex xs6 class="ml-2 mb-2">
        <you-tube :youtubeId="song.youtubeId"/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs5>
        <lyrics :lyrics="song.lyrics"/>
      </v-flex>
      <v-flex xs7 class="ml-2">
        <tabs :tab="song.tab"></tabs>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongHistoryService from '@/services/SongHistoryService'
import SongsService from '@/services/SongsService'
import {mapState} from 'vuex'
import SongData from './SongData'
import YouTube from './YouTube'
import Lyrics from './Lyrics'
import Tabs from './Tabs'

export default {
  components: {
    SongData,
    YouTube,
    Lyrics,
    Tabs
  },
  data () {
    return {
      song: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn', 'user', 'route'

    ])
  },
  async mounted () {
    // Backend request to populate Song Data
    const songId = this.route.params.songID
    this.song = (await SongsService.show(songId)).data

    if (this.isUserLoggedIn) {
      await SongHistoryService.post({
        SongId: songId
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

textarea{
width:100%;
font-family:monospace;
border: none;
height: 600px;
border-style: none;
border-color: transparent;
overflow:auto;
padding: 20px;
}
</style>
