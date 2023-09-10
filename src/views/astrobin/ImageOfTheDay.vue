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

      <TitleParallax :url-image="astrobinIOTD.image.urlHd" :title="astrobinIOTD.image.title"></TitleParallax>

      <v-toolbar height="30">
        <v-toolbar-title class="text-h6 align-center">
          This product uses the AstroBin API but is not endorsed or certified by AstroBin.
        </v-toolbar-title>
      </v-toolbar>

      <v-container class="text-left">
        <v-sheet elevation="1" class="mx-auto landing-warpper" rounded color="transparent">
          <v-sheet class="pa-3" elevation="0" color="transparent">
            <v-container>
              <v-row align="center">
                <ItemsLists :items-list="sortedTodayImage" :columns="4">
                  <template v-slot="{ item, index }">
                    <AstrobinCard v-bind:key="index" :item="item" />
                  </template>
                </ItemsLists>
              </v-row>
            </v-container>
          </v-sheet>
        </v-sheet>
      </v-container>

    </v-sheet>
  </transition>
</template>

<script setup>
import {computed, defineAsyncComponent, onMounted} from "vue";

import {useStore} from "vuex";
const store = useStore();

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitleParallax  = defineAsyncComponent(() => import('@/components/Content/TitleParallax.vue'));
const ItemsLists = defineAsyncComponent(() => import('@/components/Items/ItemsList.vue'));
const AstrobinCard = defineAsyncComponent(() => import('@/components/Items/AstrobinCard.vue'))

const fetchImageOfTheDay = () => {
  store.dispatch('astrobinIOTD/fetchImageOfTheDay');
}
const fetchListImagesOfTheDay = () => {
  store.dispatch('astrobinIOTD/fetchListImagesOfTheDay')
}

onMounted(() => {
  fetchImageOfTheDay();
  fetchListImagesOfTheDay();
});

const astrobinIOTD = computed(() => store.state.astrobinIOTD);
const sortedTodayImage = computed(() => store.getters["astrobinIOTD/sortedTodayImages"]);
const isLoading = computed(() => store.state.message.isLoading);
</script>

<script>
export default {
  name: "ImageOfTheDay"
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>