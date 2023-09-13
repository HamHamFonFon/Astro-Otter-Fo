<script setup>
defineProps({
  title: String,
  urlImage: String
});
</script>
<template>
  <v-parallax
    cover
    :src="urlImage"
  >
    <v-row class="w-auto fill-height" align="center" justify="center">
      <div class="text-h2 text-white">
        <div class="text-h2 text-white">{{ title }}</div>
      </div>
    </v-row>
  </v-parallax>
</template>



<style scoped>

</style>

<!--      :src="isHovering ? image.urlHdSolution : image.urlHd" -->
<!--      @mouseover="isHovering = true" @mouseout="isHovering = false"-->