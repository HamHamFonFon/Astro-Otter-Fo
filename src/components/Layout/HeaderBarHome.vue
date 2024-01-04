<script setup>
import {defineAsyncComponent} from "vue";

const LanguageSwitcher = defineAsyncComponent(() => import('@/components/Layout/LanguageSwitcher.vue'))
// const Notifications = defineAsyncComponent(() => import('@/components/Layout/Notifications.vue'))
</script>

<template>
      <div class="headerHome d-flex">
        <v-spacer></v-spacer>
<!--        <Notifications btnColor="transparent" iconColor="#1ed760" bgColor="background"></Notifications>-->
        <LanguageSwitcher btnColor="transparent" iconColor="#1ed760" bgColor="background"></LanguageSwitcher>
      </div>
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
