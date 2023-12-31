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
      <TitleParallax :url-image="astrobinIOTD.urlHd" :title="astrobinIOTD.title" :user="astrobinIOTD.user"></TitleParallax>

      <v-toolbar height="30">
        <v-toolbar-title class="text-h6 align-center">
          {{ $t('astrobin.disclaimer') }}
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
import {computed, defineAsyncComponent, onBeforeMount, onMounted, reactive, ref} from "vue";

import {useStore} from "vuex";
import * as WS from "@/repositories/astrobin/iotd/webservice";
import {ImagesWs} from "@/repositories/astrobin/images";
const store = useStore();

const astrobinIOTDRef = reactive({});
const listAstrobinIOTDRef = ref([]);

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitleParallax  = defineAsyncComponent(() => import('@/components/Content/TitleParallax.vue'));
const ItemsLists = defineAsyncComponent(() => import('@/components/Items/ItemsList.vue'));
const AstrobinCard = defineAsyncComponent(() => import('@/components/Items/AstrobinCard.vue'))

const fetchImageOfTheDay = async () => {
  try {
    const wsResponse = await WS.GET_TODAY_WS(0, 1);
    const wsResponseImage = await ImagesWs.GET_IMAGE_BY_ID(wsResponse.astrobinImageId);

    astrobinIOTDRef.value = wsResponseImage;
    setTimeout(function() {
      store.commit('message/setMessage', {
        'loading': false,
        'type': 'success',
        'message': 'Image of the day loaded.',
        'httpCode': 200
      }, { root: true })
    }, 1000)
  } catch (error) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': error.message,
      'httpCode': error.code
    }, { root: true })
  }

}
const fetchListImagesOfTheDay = async () => {
  try {
    const wsResponse = await WS.GET_TODAY_WS(1, 16);
    wsResponse.forEach(response => {
      const wsResponseImage = ImagesWs.GET_IMAGE_BY_ID(response.astrobinImageId);
      wsResponseImage.then(r => {
        let astrobinIOTD = {
          id: r.astrobin_id,
          image: r.urlRegular,
          lazyImage: r.urlGallery,
          date: response.date, // we use date of GET_TODAY_WS response, not image object response
          title: r.title,
          user: r.user,
          views: r.views,
          likes: r.likes
        };
        listAstrobinIOTDRef.value.push(astrobinIOTD)
      });
    });
  } catch (error) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': error.message,
      'httpCode': error.code
    }, { root: true })
  }

}

onBeforeMount(() => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': 'Loading Image Of The Day from Astrobin...',
    'httpCode': null
  }, { root: true });
});

onMounted(() => {
  fetchImageOfTheDay();
  fetchListImagesOfTheDay();
});

const isLoading = computed(() => store.state.message.loading);
const astrobinIOTD = computed(() => astrobinIOTDRef.value);
const sortedTodayImage = computed(() => {
  return listAstrobinIOTDRef.value.slice().sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
});

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
