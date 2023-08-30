<template>
  <v-row class="grid" :style="{ gridTemplateColumns: this.getColumnStyle(), gridGap: this.getGapStyle() }">
    <slot
        v-for="item in itemsList"
        :item="item"
    >
    </slot>
  </v-row>
</template>

<script>
export default {
  name: "ItemsLists",
  props: {
    itemsList: Object,
    gap: {
      type: Number,
      default: 0
    },
    columns: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getColumnStyle() {
      return (this.$isMobile()) ? `repeat(auto-fill, minmax(350px, 1fr))` :  `repeat(${this.columns}, 1fr)`;
    },

    getGapStyle() {
      return `${this.gap}em`;
    }
  }
}
</script>

<style scoped>
:root {
  counter-reset: masonry;
}
.grid {
  display: grid;
}

.image-item {
  border-radius: 5px;
  overflow: hidden;
}
</style>