<template>
  <TitlePage :title="t('catalogs.title')" />

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
<!--        TODO : SEPARE in DsoBrowser into two components : -->
<!--         - One for filters-->
<!--         - seconds for list-->
        <DsoBrowser />
      </v-container>
    </v-sheet>
  </transition>

</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, onMounted} from "vue";
import {useStore} from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();

import {applySeo} from "@/services/seo";
import backgroundCatalogs from '@/assets/images/background/background_vlt.jpg';

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitlePage = defineAsyncComponent(() => import('@/components/Content/TitlePage.vue'));
const DsoBrowser = defineAsyncComponent(() => import('@/components/Content/DsoBrowser.vue'));

onBeforeMount(() => {
  store.commit('message/setLoading', false);
});
onMounted(() => {
  applySeo({
    title: t('catalogs.title'),
    description: t('catalogs.description'),
    image: backgroundCatalogs.value,
    imageAlt: '',
    fullUrl: ''
  });
});

const isLoading = computed(() => store.state.message.loading);
</script>

<style scoped>

</style>
