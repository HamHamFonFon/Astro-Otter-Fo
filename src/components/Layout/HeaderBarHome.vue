<script setup>
import {defineAsyncComponent} from "vue";

const LanguageSwitcher = defineAsyncComponent(() => import('@/components/Layout/LanguageSwitcher.vue'))
</script>

<template>
  <v-app-bar
    color="red"
    mode="shift"
  >
    <v-toolbar color="transparent">
      <v-spacer></v-spacer>
      <div class="d-flex">
        <LanguageSwitcher></LanguageSwitcher>
      </div>
    </v-toolbar>
  </v-app-bar>
</template>

<style scoped>

</style>
