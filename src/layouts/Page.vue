<template>
  <!-- Add bar -->
  <HeaderBar :allRoutes="allRoutes" />

  <!-- Breadcrumbs -->
<!--  <BreadCrumb />-->

  <!-- -->
  <v-main class="main-container main-background">
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

const HeaderBar = defineAsyncComponent(() => import('@/components/Layout/HeaderBar.vue'));
const FooterBar = defineAsyncComponent(() => import('@/components/Layout/FooterBar.vue'));

const SocialSharing = defineAsyncComponent(() => import('@/components/Layout/SocialSharing.vue'))
const BackToTop = defineAsyncComponent(() => import('@/components/Layout/BackToTop.vue'));

const allRoutes = computed(() => useRouter().options.routes)
// import BreadCrumb from "@/components/Layout/BreadCrumb.vue";
</script>

<style scoped>
.main-background {
  background-image: linear-gradient(135deg, #111b27, #633535 ); /** #253A46 **/
}
</style>