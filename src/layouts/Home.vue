<template>
  <!-- No headerBar -->

  <!-- Body -->
  <v-main class="main-container"
    v-touch="{
      // left: () => (this.$store.commit('customizedTheme/setShowSideBar', false)),
      // right: () => (this.$store.commit('customizedTheme/setShowSideBar', true))
    }"
  >
    <div class="flex-fill">
      <slot></slot>
    </div>
  </v-main>

  <!-- Footer -->
  <FooterBar :allRoutes="allRoutes" />
</template>

<script setup>
import {computed, defineAsyncComponent} from "vue";
import {useRouter} from "vue-router";

const FooterBar = defineAsyncComponent(() => import('@/components/Layout/FooterBar.vue'));
const allRoutes = computed(() => useRouter().options.routes)
</script>

<style>
  .main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>