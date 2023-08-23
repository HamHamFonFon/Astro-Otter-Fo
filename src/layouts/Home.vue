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
  <FooterBar />
</template>

<script>
import FooterBar from "@/components/Layout/FooterBar.vue";
export default {
  name: "HomeLayout",
  components: {
    FooterBar
  }
}
</script>

<style>
  .main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>