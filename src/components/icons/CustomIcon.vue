<template>
  <div v-html="svgContent"></div>
</template>

<script setup>
import { ref, onMounted, onErrorCaptured } from "vue";

const svgContent = ref(null);

const props = defineProps({
  iconName: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  try {
    const svgFile = await import(`@/assets/svg/${props.iconName}.svg`);
    svgContent.value = svgFile.default;
  } catch (error) {
    console.error(`Error loading SVG: ${props.iconName}.svg`, error);
  }
})

onErrorCaptured((error) => {
  console.error(`Error in CustomIcon component: ${error}`);
});
</script>

<script>

export default {
  name: "CustomIcon"
}
</script>

<style scoped>
</style>