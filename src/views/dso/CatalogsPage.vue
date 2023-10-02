<template>
  <TitlePage title="Catalogs" />

  <transition name="fade">
    <Message />
  </transition>

  <transition>
    <v-sheet
        elevation="0"
        class="landing-warpper"
        color="transparent"
        v-if="!isLoading"
    >
      <v-container class="text-left">
        <DsoBrowser />
      </v-container>
    </v-sheet>
  </transition>

</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount} from "vue";
import {useStore} from "vuex";

const store = useStore();

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitlePage = defineAsyncComponent(() => import('@/components/Content/TitlePage.vue'));
const DsoBrowser = defineAsyncComponent(() => import('@/components/Content/DsoBrowser.vue'));

onBeforeMount(() => {
  store.commit('message/setLoading', false);
});



const isLoading = computed(() => store.state.message.loading);
</script>

<style scoped>

</style>