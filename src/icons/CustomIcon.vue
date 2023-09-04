<template>
  <div style="border: 1px green solid" v-html="iconContent" />
</template>

<script>
export default {
  name: "CustomIcon",
  props: {
    iconName: {
      type: String,
      required: true
    }
  },
  computed: {
    iconContent () {
      try {
        const icon = require(`@/assets/svg/${this.iconName}.svg`);
        return icon
      } catch (err) {
        console.error(`Error loading SVG icon: ${this.iconName}`);
        return null;
      }
    }
  }
}
</script>

<style scoped>

</style>