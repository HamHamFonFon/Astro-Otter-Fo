<template>
  <v-sheet
    elevation="1"
    class="mx-auto landing-warpper"
    rounded
  >
    <slot
      v-for="item in items"
      :item="item"
    ></slot>
  </v-sheet>
</template>

<script>
export default {
  name: "ItemCard",
  props: {
    items: {
      type: Object,
      default: null,
    }
  }
}
</script>

<style scoped>

</style>