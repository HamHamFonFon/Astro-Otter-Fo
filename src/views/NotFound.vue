<template>
  <div :style="backgroundStyle" class="background">
    <Error404 />
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";
import backgroundImage from '@/assets/images/notfound/interstellar-black-hole.jpg'
const Error404 = defineAsyncComponent(() => import('@/components/Layout/Error404.vue'))

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundImage})`,
}));
</script>

<script>
export default {
  name: "NotFound",
}
</script>

<style scoped>
.background {
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>