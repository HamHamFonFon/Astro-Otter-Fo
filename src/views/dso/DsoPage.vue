<template>
  <transition name="fade">
    <Message />
  </transition>
  <transition name="fade">
    <v-sheet
        elevation="0"
        class="landing-warpper"
        color="transparent"
        v-if="!isLoading"
    >
        <TitleParallax :title="dso.fullNameAlt" :urlImage="dsoCover"></TitleParallax>
    </v-sheet>
  </transition>
</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, onMounted, ref} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {DsoWs} from "@/repositories/api/dso";

const store = useStore();
const route = useRoute();

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitleParallax = defineAsyncComponent(() => import('@/components/Content/TitleParallax.vue'));

const dsoId = ref(route.params.id);
const dsoRef = ref({});

onBeforeMount(() => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': 'Loading DSO data...',
    'httpCode': null
  });
})

onMounted(() =>  {
  fetchDso()
})

const fetchDso = async () => {
  try {
    dsoRef.value = await DsoWs.GET_DSO_ITEM(dsoId.value);
  } catch (err) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': err.message,
      'httpCode': err.code
    }, { root: true })
  }
  store.commit('message/setLoading', false);
};

const isLoading = computed(() => store.state.message.loading);
const dso = computed(() => dsoRef.value )
const dsoCover = computed(() => (dso.value.astrobinUser) ? dso.value.astrobin.url_hd: null)
</script>

<style scoped>

</style>