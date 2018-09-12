<template>
  <div>
    <v-tabs v-model="active" color="cyan" dark slider-color="red">
      <v-tab>KPI's</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text><blocks-panel /></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>Accomplishments</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text> Accomplishment Pages Go Here </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>Milestones</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text> Milestones Pages Go Here </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>Risks</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text> Risks Pages Go Here </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>Preview</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text> Preview 4-Blocker Here </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <div class="text-xs-center mt-3">
      <v-btn @click="next">Continue</v-btn>
    </div>
  </div>
</template>

<script>
import BlocksService from '@/services/BlocksService'
import BlocksPanel from './BlocksPanel'
import BlocksEntry from './BlocksEntry'

import {mapState} from 'vuex'

export default {
  components: {
    BlocksPanel,
    BlocksEntry
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      songs: null,
      active: null,
      blockers: [
        {
          name: 'KPI',
          text: 'KPI info'
        },
        {
          name: 'Accomplishment',
          text: 'Accomp info'
        },
        {
          name: 'Milestones',
          text: 'Mile info'
        },
        {
          name: 'Risk',
          text: 'Risk info'
        },
        {
          name: 'Preview',
          text: 'Preview info'
        }
      ]
    }
  },
  async mounted () {
    // Backend request to populate Song Data
    // TODO: Remember to do '.data when fetching Data from API'
    this.blocks = (await BlocksService.index()).data
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 4 ? active + 1 : 0)
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
