<template>
  <panel title="YouTube Video">
    <youtube
      :video-id="youtubeId"
      :player-width="500"
      :player-height="200">
    </youtube>
  </panel>
</template>

<script>

export default {
  props: [
    'youtubeId'
  ]
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
