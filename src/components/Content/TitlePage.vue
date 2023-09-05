<script setup>
defineProps({
  title: String
});
</script>
<script>
export default {
  name: "TitlePage",
}
</script>
<template>
  <v-toolbar height="150" color="transparent">
    <v-toolbar-title class="text-h6 font-weight-bold">
      <!-- <v-icon class="mr-2">mdi-account</v-icon> -->
      <h2 class="text-h3 text-grey-darken-1">{{ title }}</h2>
    </v-toolbar-title>
  </v-toolbar>
</template>



<style scoped>

</style>