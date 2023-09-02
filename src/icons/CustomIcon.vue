<template>
<!--  <div v-html="iconContent" />-->
  <img :src="iconContent" width="32" height="32" color="white" />
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
        console.log('Load '+`@/assets/svg/${this.iconName}.svg` +' file');
        const icon = require(`@/assets/svg/${this.iconName}.svg`);
        return icon; //.default;
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