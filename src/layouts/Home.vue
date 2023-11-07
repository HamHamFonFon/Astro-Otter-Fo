<template>
  <!-- No headerBar -->

  <!-- Body -->
  <v-main class="main-container">
    <div class="flex-fill">
      <slot></slot>

      <SocialSharing />
      <BackToTop />
    </div>
  </v-main>

  <!-- Footer -->
  <FooterBar :allRoutes="allRoutes" />
</template>

<script setup>
import {computed, defineAsyncComponent} from "vue";
import {useRouter} from "vue-router";

const SocialSharing = defineAsyncComponent(() => import('@/components/Layout/SocialSharing.vue'))
const BackToTop = defineAsyncComponent(() => import('@/components/Layout/BackToTop.vue'));

const FooterBar = defineAsyncComponent(() => import('@/components/Layout/FooterBar.vue'));
const allRoutes = computed(() => useRouter().options.routes)
</script>