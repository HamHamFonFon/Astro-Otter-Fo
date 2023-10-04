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

      <v-container class="text-left">

        <!-- Description -->
        <v-row v-if="constellationRef.value.description">
          <v-col cols="12" md="6">
            <v-sheet elevation="0">
              <v-card elevation="0" max-width="800" class="mx-auto my-10">
                {{ constellationRef.value.description }}
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>

        <!--  Items-->
        <DsoBrowser defaultFilterName="constellation" :defaultFilterValue="constellationId"></DsoBrowser>

        <SkyMap
          :centerMap="constellationCenterMap"
          :constellationId="constellationRef.value.id"
          :constellationGeoData="constellationGeoJson"
          :itemsGeoData="null"
        ></SkyMap>
      </v-container>
    </v-sheet>
  </transition>
</template>

<script setup>

import {computed, defineAsyncComponent, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

const store = useStore();
const route = useRoute();

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitleImageHero = defineAsyncComponent(() => import("@/components/Content/TitleImageHero.vue"));
const DsoBrowser = defineAsyncComponent(() => import('@/components/Content/DsoBrowser.vue'))
const SkyMap = defineAsyncComponent(() => import('@/components/Content/SkyMap.vue'))

import { geoJsonServices } from "@/services/geojson";
import {ConstellationWs} from "@/repositories/api/constellations";

// Constellation
const constellationId = ref(route.params.constellationId);
const constellationRef = reactive({});

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
});

/**
 * Load constellation Data
 * @returns {Promise<void>}
 */
const fetchConstellation = async () => {
    try {
      constellationRef.value = await ConstellationWs.GET_CONSTELLATION_ITEM(constellationId.value);
      setTimeout(() =>  store.commit('message/setLoading', false), 500);
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
const constellationCover = computed(() => require(`@/assets/images/constellations/cover/${constellationRef.value.cover}`));

// GeoData
const constellationCenterMap = computed(() => constellationRef.value.geometry.coordinates)
const constellationGeoJson = computed(() => geoJsonServices.geoJsonConstellation(constellationRef.value));

</script>

<style scoped>

</style>