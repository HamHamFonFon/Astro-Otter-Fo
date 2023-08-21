<template>
  <div :style="backgroundStyle" class="background">
    <Error404 />
  </div>
</template>

<script>
import backgroundImage from '@/assets/images/notfound/interstellar-black-hole.jpg'
import Error404 from "@/components/Layout/Error404.vue";
import {computed} from "vue";
export default {
  name: "NotFound",
  components: {
    Error404
  },
  setup() {
    const backgroundStyle = computed(() => ({
      backgroundImage: `url(${backgroundImage})`,
    }));

    return {
      backgroundStyle
    };
  }
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