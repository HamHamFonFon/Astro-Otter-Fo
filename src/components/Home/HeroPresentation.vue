<template>
  <v-sheet
    elevation="0"
    class="mx-auto"
    rounded
    :style="backgroundStyle"
  >
    <v-container class="text-center" :style="{margin: 'auto'}">
      <v-sheet color="transparent" elevation="0">
        <img class="mx-auto" width="200" src="@/assets/images/logos/astro_otter_200-200.png" alt="Astro-Otter logo" style="border-radius: 50%" />
        <v-card
          color="transparent"
          elevation="0"
          max-width="800"
          class="mx-auto my-10 py-0py-md-12"
        >

          <h1 class="text-h2 mt-4 mx-auto text-shades-white">
            {{ $t('home.explore') }}
          </h1>
        </v-card>
        <v-row class="mt-5">
          <v-col cols="12" sm="6">
            <v-btn
                block
                size="x-large"
                class="text-white mr-5"
                color="primary"
                @click="scrollToSearch"
            >{{ $t('home.search') }}</v-btn
            >
          </v-col>
          <v-col cols="12" sm="6">
            <router-link :to="{name: 'catalogs'}">
              <v-btn
                  block
                  size="x-large"
                  variant="outlined"
                  class="text-white mr-5"
                  color="grey"
                >{{ $t('home.browse') }}
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </v-sheet>
</template>

<script setup>
import backgroundImage from '@/assets/images/background/bg-1.webp'
import {computed} from "vue";

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', display: 'flex'
}));

/**
 *
 */
const scrollToSearch = () => {
  const homeSearch = document.getElementById('search');
  if (homeSearch) {
    homeSearch.scrollIntoView({ behavior: "smooth" })
  }
}
</script>

<style scoped>

</style>
