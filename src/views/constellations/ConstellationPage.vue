<template>
  <transition name="fade">
    <Message />
  </transition>
  <transition name="fade" v-if="!isLoading && constellation">
    <h2>{{ constellation.title }}</h2>
  </transition>

</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, onMounted, ref} from "vue";
const store = useStore();
const route = useRoute();

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));

import { useStore} from "vuex";
import {useRoute} from "vue-router";

const constellationId = ref(route.params.constellationId);

onBeforeMount(() => {
  store.commit('message/setLoading', true);
})

onMounted(() => store.dispatch('constellations/fetchConstellationById', constellationId));
const constellation = computed(() => store.getters['constellations/getConstellationById'](constellationId));
const isLoading = computed(() => store.state.message.isLoading);
</script>

<style scoped>

</style>