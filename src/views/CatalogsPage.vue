<template>
  <v-toolbar height="150"  color="transparent">
    <v-toolbar-title class="text-h6 font-weight-bold">
      <!-- <v-icon class="mr-2">mdi-account</v-icon> -->
      <h2 class="text-h3 text-grey-darken-1">Catalogs</h2>
    </v-toolbar-title>
  </v-toolbar>

  <v-sheet
      style="margin: 2em;"
      elevation="0"
      class="landing-warpper"
      color="transparent"
  >
    <v-container class="text-left">
      <v-card  color="transparent">
        <v-card-title>
          Filter list items by constellation, type and magnitude...and discover most beautiful celestial objects.
        </v-card-title>
        <v-divider></v-divider>

      </v-card>

      <v-card  color="transparent">

      </v-card>
    </v-container>


  </v-sheet>
</template>

<script>
export default {
  name: "CatalogsPage"
}
</script>

<style scoped>

</style>