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
          <v-col cols="12" md="12">
            <v-container class="text-justify" >
              <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="background">
                <v-sheet class="pa-3" elevation="0" color="transparent">
                  <v-container>
                    <div class="richtext">
                      <p>{{ constellationRef.value.description }}</p>
                    </div>
                  </v-container>
                </v-sheet>
              </v-sheet>
            </v-container>
          </v-col>
        </v-row>

        <!--  Items-->
        <!--        TODO : SEPARE in DsoBrowser into two components : -->
        <!--         - One for filters-->
        <!--         - seconds for list-->
        <DsoBrowser defaultFilterName="constellation" :defaultFilterValue="constellationRef.value.id"></DsoBrowser>

        <SkyMap
          :constellationId="constellationRef.value.id"
          :constellationGeoData="constellationGeoJson"
        ></SkyMap>
      </v-container>
    </v-sheet>
  </transition>
</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import { useI18n } from "vue-i18n";

const store = useStore();
const route = useRoute();
const { t } = useI18n();

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitleImageHero = defineAsyncComponent(() => import("@/components/Content/TitleImageHero.vue"));
const DsoBrowser = defineAsyncComponent(() => import('@/components/Content/DsoBrowser.vue'))
const SkyMap = defineAsyncComponent(() => import('@/components/Content/SkyMap.vue'))

import { geoJsonServices } from "@/services/geojson";
import { ConstellationWs } from "@/repositories/api/constellations";
import {applySeo} from "@/services/seo";
import Trans from "@/services/translation";

// Constellation
const constellationId = ref(route.params.constellationId);
const constellationRef = reactive({});

onBeforeMount(() => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': t('constellation.load.data'),
    'httpCode': null
  });
})

onMounted(() => {
  fetchConstellation();
  const files = [
    'https://d3js.org/d3.v3.min.js',
    'https://d3js.org/d3-geo-projection.v2.min.js',
    'https://d3js.org/d3-drag.v1.min.js'
  ];

  files.forEach(s => {
    const tag = document.createElement("script");
    tag.setAttribute("src", s);
    tag.setAttribute("type", 'text/javascript');

    document.body.appendChild(tag);
  })
});

watch(
  () => route.params.constellationId,
  async newConstellationId => {
    constellationId.value = newConstellationId;
    await fetchConstellation();
  }
)

watch(() => Trans.currentLocale, () => {
  fetchConstellation();
});


/**
 * Load constellation Data
 * @returns {Promise<void>}
 */
const fetchConstellation = async () => {
    try {
      constellationRef.value = await ConstellationWs.GET_CONSTELLATION_ITEM(constellationId.value);
      store.commit('message/setLoading', false);
      applySeo({
        title: constellationRef.value.alt,
        description: constellationRef.value.description,
        image: constellationCover,
        imageAlt: constellationRef.value.alt,
        fullUrl: route.fullPath
      });
    } catch (err) {
      store.commit('message/setMessage', {
        'loading': true,
        'type': 'error',
        'message': err.message ?? 'Error loading',
        'httpCode': err.code
      }, { root: true })
  }
};

const isLoading = computed(() => store.state.message.loading);
const constellationCover = computed(() => require(`@/assets/images/constellations/cover/${constellationRef.value.cover}`));

// GeoData
// const constellationCenterMap = computed(() => constellationRef.value.geometry.coordinates)
const constellationGeoJson = computed(() => geoJsonServices.geoJsonConstellation(constellationRef.value));
</script>

<style scoped>

</style>
