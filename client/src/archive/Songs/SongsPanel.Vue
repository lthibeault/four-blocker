<template>
  <panel title="Song">
      <v-btn class="cyan accent-2"
        slot="action"
        :to="{ name: 'songs-create'}"
        light
        small
        absolute
        right
        fab>
          <v-icon>add</v-icon>
      </v-btn>
      <div class="song" v-for="song in songs" :key='song.id'>
        <v-layout>
          <v-flex xs 10>
            <div class="song-title">
              {{song.title}}
            </div>
            <div class="song-artist">
              {{song.artist}}
            </div>
            <div class="song-genre">
              {{song.genre}}
            </div>
            <v-btn class="cyan accent-2"
              slot="action"
              :to="{ name: 'song', params:{ songID: song.id }}"
              light
              small
              absolute
              fab>
                <v-icon>queue_music</v-icon>
              </v-btn>
          </v-flex>
          <v-flex xs 6>
            <img class="album-image" :src="song.albumImage" />
          </v-flex>
        </v-layout>
      </div>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    // Backend request to populate Song Data
    // TODO: Remember to do '.data when fetching Data from API'
    this.songs = (await SongsService.index()).data
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }

    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
  padding:20px;
  height:330px;
  overflow:hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
    font-size: 18px;
  }

.album-image{

  height:50%;
  margin: 0 auto;
}
</style>
