<template>
  <div class="lazyBackground">
    <v-img
      :src="urlImage"
      height="450"
    >
      <v-row class="w-auto fill-height" align="center" justify="center">
        <div class="text-h2 text-white" style="background-color: #111b27; opacity: 0.7; padding: 0.5em 100%;">
          <div class="text-h2 text-white">{{ title }}</div>
        </div>
      </v-row>
    </v-img>
  </div>

</template>

<script>
export default {
  name: "TitleImageHero",
  props: {
    title: String,
    urlImage: String,
  }
}
</script>

<style scoped>
  .lazyBackground {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
    color: '#FFFFF';
    filter: grayscale(100%);
  }
</style>