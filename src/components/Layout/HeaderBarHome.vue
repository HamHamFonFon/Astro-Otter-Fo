<script setup>
import {defineAsyncComponent} from "vue";

const LanguageSwitcher = defineAsyncComponent(() => import('@/components/Layout/LanguageSwitcher.vue'))
</script>

<template>
<!--  <v-app-bar-->
<!--    color="transparent"-->
<!--    mode="shift"-->
<!--    class="headerHome"-->
<!--  >-->
<!--    <v-toolbar color="transparent">-->
<!--      <v-spacer></v-spacer>-->
      <div class="headerHome d-flex">
        <v-spacer></v-spacer>
        <LanguageSwitcher btnColor="transparent" iconColor="#1ed760"></LanguageSwitcher>
      </div>
<!--    </v-toolbar>-->
<!--  </v-app-bar>-->
</template>

<style scoped>
.headerHome {
  top: 0.5em;
  position: fixed;
  z-index: 999;
  transition: all 0.3s;
  right: 5px;
}
</style>
