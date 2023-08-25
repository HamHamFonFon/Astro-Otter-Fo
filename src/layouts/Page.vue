<template>

  <!-- Add bar -->
  <HeaderBar :allRoutes="allRoutes" />

  <!-- Breadcrumbs -->

  <v-main class="main-container main-background">
    <div class="flex-fill">
      <slot></slot>
    </div>
  </v-main>

  <FooterBar />
</template>

<script>

import HeaderBar from "@/components/Layout/HeaderBar.vue";
import FooterBar from "@/components/Layout/FooterBar.vue";


export default {
  name: "PageLayout",
  components: {
    HeaderBar,
    FooterBar
  },
  computed: {
    allRoutes() {
      return this.$router.options.routes;
    }
  }
}
</script>

<style scoped>
.main-background {
  background-image: linear-gradient(135deg, #111b27, #253A46); /** #243b55 **/
}
</style>