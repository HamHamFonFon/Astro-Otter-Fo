<template>
  <div v-html="svgContent"></div>
</template>

<script>
import { ref, onMounted, onErrorCaptured } from "vue";

export default {
  name: "CustomIcon",
  props: {
    iconName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const svgContent = ref(null);
    onMounted(async () => {
      try {
        const svgFile = await import(`@/assets/svg/${props.iconName}.svg`);
        svgContent.value = svgFile.default;
      } catch (error) {
        console.error(`Error loading SVG: ${props.iconName}.svg`, error);
      }
    });

    onErrorCaptured((error) => {
      console.error(`Error in CustomIcon component: ${error}`);
    });

    return {
      svgContent
    }
  }
}
</script>

<style scoped>

</style>