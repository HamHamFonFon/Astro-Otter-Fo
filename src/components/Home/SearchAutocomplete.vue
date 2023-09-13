<template>
  <v-sheet
      elevation="0"
      class="mx-auto landing-warpper"
      rounded
      color="primary"
      height="10em"
  >
    <v-sheet
        color="transparent"
        elevation="0"
        max-width="1600"
        class="mx-auto pa-5"
    >
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="3">
            <h1 class="text-h5 font-weight-bold text-center text-grey" >
              Seek and find amazing deep space objects
            </h1>
          </v-col>
          <v-col cols="12" sm="12" md="9">
            <v-autocomplete
              v-model="searchDto"
              :items="results"
              type="search"
              label="Search"
              placeholder="Search for galaxy, nebula, constellation..."
              rounded
              variant="outlined"
              append-inner-icon="mdi-magnify"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import { reactive, ref } from "vue";

const searchDto = ref(null);
const results = reactive([]);
</script>

<style scoped>

</style>