<template>
  <panel title="Song Data">
    <v-layout>
      <v-flex xs 6>
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
          v-if="isUserLoggedIn"
          dark
          :to="{name: 'song-edit',params () {return {songID: song.id}}}"
          :song="song">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn class="cyan accent-2"
            v-if="isUserLoggedIn && !bookmark"
            dark
            @click="setBookmark">
              <v-icon>bookmark</v-icon>
            </v-btn><br />
            <v-btn class="cyan accent-2"
                v-if="isUserLoggedIn && bookmark"
              dark
              @click="unSetBookmark">
                <v-icon>un_bookmark</v-icon>
              </v-btn>
      </v-flex>
      <v-flex xs 6>
        <img class="album-image" :src="song.albumImage" /><br/>
        {{song.album}}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    async setBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          SongId: this.song.id
        })).data
        console.log('bookmark')
      } catch (err) {
        console.log(err)
      }
    },
    async unSetBookmark () {
      try {
        console.log(this.bookmark.bookmarkId)
        await BookmarksService.delete(this.bookmark.bookmarkId)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    if (!this.isUserLoggedIn) {
      return
    }
    const bookmarks = (await BookmarksService.index({
      SongId: this.song.id
    })).data
    if (bookmarks.length) {
      this.bookmark = bookmarks[0]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
  padding:20px;
  height:330px;
  overflow: hidden;
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
  width: 50%;
  margin: 0 auto;
}
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
