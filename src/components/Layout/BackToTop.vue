<template>
  <v-btn class="backToTop" :class="{ visible: isVisible }" @click="scrollToTop" :color="backgroundColor">
    <v-icon
      small
      color="green"
      icon="mdi-arrow-up"
    ></v-icon>
  </v-btn>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";

const isVisible = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  isVisible.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const backgroundColor = computed(() => (screen.width <= 760) ? 'primary': 'transparent')
</script>

<style scoped>
.backToTop {
  position: fixed;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  bottom: 1em;
  right: 5px;
  z-index: 999;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 9px #1ed760;
  transition: all 0.5s;
  cursor: pointer;
}

.backToTop:hover {
  box-shadow: 1px 1px 18px green;
  transition: all 0.5s;
}

.backToTop.visible {
  opacity: 1;
  visibility: visible;
}
</style>