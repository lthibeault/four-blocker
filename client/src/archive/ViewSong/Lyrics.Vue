<template>
  <panel title="Lyrics">
    <textarea
      readonly
      v-model="lyrics">
    </textarea>
  </panel>
</template>

<script>

export default {
  props: [
    'lyrics'
  ]
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
