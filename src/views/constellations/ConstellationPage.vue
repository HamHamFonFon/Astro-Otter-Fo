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
      <TitleImageHero :title="constellationRef.value.alt" :urlImage="constellationCover"></TitleImageHero>

      <v-divider></v-divider>
      <v-container v-if="constellationRef.value.description">
        <v-row>
          <v-col cols="12" md="6">
            <v-sheet elevation="0">
              <v-card
                  elevation="0"
                  max-width="800"
                  class="mx-auto my-10"
              >
                {{ constellationRef.value.description }}
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="transparent">
        <v-sheet class="pa-3" elevation="0" color="transparent">
          <v-container>
            <v-row align="center">
              <ItemsLists :items-list="items.value" :columns="5">
                <template v-slot="{ item, index }">
                  <DsoCard v-bind:key="index" :dso="item" />
                </template>
              </ItemsLists>
            </v-row>
          </v-container>
        </v-sheet>
      </v-sheet>
    </v-sheet>

  </transition>

</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, onMounted, reactive, ref} from "vue";
const store = useStore();
const route = useRoute();

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitleImageHero = defineAsyncComponent(() => import("@/components/Content/TitleImageHero.vue"));
const ItemsLists = defineAsyncComponent(() => import('@/components/Items/ItemsList.vue'));
const DsoCard = defineAsyncComponent(() => import('@/components/Items/DsoCard.vue'))

import { useStore} from "vuex";
import {useRoute} from "vue-router";
import {ConstellationWs} from "@/repositories/api/constellations";
import {DsoWs} from "@/repositories/api/dso";


const constellationId = ref(route.params.constellationId);
const constellationRef = reactive({});
const items = reactive({});

onBeforeMount(() => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': 'Loading constellation data...',
    'httpCode': null
  });
})

onMounted(() => {
  fetchConstellation();
  fetchDsoByConstellation()
});

/**
 * Load constellation Data
 * @returns {Promise<void>}
 */
const fetchConstellation = async () => {
  if (88 === store.getters['constellations/getTotalCount']) {
    constellationRef.value = store.getters['constellations/getConstellationById'](constellationId.value);
  } else {
    try {
      constellationRef.value = await ConstellationWs.GET_CONSTELLATION_ITEM(constellationId.value);
    } catch (err) {
      store.commit('message/setMessage', {
        'loading': true,
        'type': 'error',
        'message': err.message,
        'httpCode': err.code
      }, { root: true })
    }
  }
  store.commit('message/setLoading', false);
};

/**
 * Load list of DSO in constellation
 * @returns {Promise<void>}
 */
const fetchDsoByConstellation = async () => {
  try {
    items.value = await DsoWs.GET_DSO_LIST({constellation: constellationId.value}, 0, 20);
  } catch (err) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': err.message,
      'httpCode': err.code
    }, { root: true })
  }

};

const isLoading = computed(() => store.state.message.loading);
const constellationCover = computed(() => {
  return require(`@/assets/images/constellations/cover/${constellationRef.value.cover}`)
});
</script>

<style scoped>

</style>