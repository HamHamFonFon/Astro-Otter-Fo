<template>
  <div :style="backgroundStyle" class="backgroundNotFound">
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