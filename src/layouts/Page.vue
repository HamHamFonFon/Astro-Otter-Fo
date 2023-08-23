<template>

  <!-- Add bar -->

  <!-- Breadcrumbs -->

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

  <FooterBar />
</template>

<script>

import FooterBar from "@/components/Layout/FooterBar.vue";


export default {
  name: "PageLayout",
  components: {
    FooterBar
  }
}
</script>

<style scoped>

</style>