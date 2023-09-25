<script setup>
defineProps({
  title: String,
  urlImage: String,
  user: String
});
</script>
<template>
  <v-parallax
    cover
    :src="urlImage"
  >
    <v-row class="w-auto fill-height" align="center" justify="center">
      <div class="text-h2 text-white">
        <h2 class="text-h2 text-white">{{ title }}</h2>

        <h4 v-if="user" class="text-h6 subheading">
          &#169; {{ user }}
        </h4>
      </div>
    </v-row>
  </v-parallax>
</template>



<style scoped>

</style>

<!--      :src="isHovering ? image.urlHdSolution : image.urlHd" -->
<!--      @mouseover="isHovering = true" @mouseout="isHovering = false"-->