<template>
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
</template>

<script>
export default {
  name: "HomeLayout"
}
</script>

<style>
  .main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>