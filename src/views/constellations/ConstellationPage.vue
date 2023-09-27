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
        <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="transparent">
          <v-sheet class="pa-3" elevation="0" color="transparent">
            <v-container>

              <v-row align="center" justify="center">
                Results : {{ nbItems }} / {{ totalRef }}
                <v-divider></v-divider>
                <v-radio-group inline align="justify" justify v-model="selectedFilter" label="Filtering by type">
                  <div>
                    <v-radio label="All" value="all" @change="filteringItemsByType()"></v-radio>
                  </div>
                  <div v-for="radio in filtersByType" v-bind:key="radio">
                    <v-radio :label="radio.label" :value="radio.name" @change="filteringItemsByType"></v-radio>
                  </div>
                </v-radio-group>
                <v-divider></v-divider>
              </v-row>

              <v-row align="center">
                <ItemsLists :items-list="items" :columns="5">
                  <template v-slot="{ item, index }">
                    <DsoCard v-bind:key="index" :dso="item" />
                  </template>
                </ItemsLists>
              </v-row>

              <v-row align="center" justify="center">
                <BtnMoreItems
                    v-if="nbItems < totalRef"
                    @click-event="showMoreItems"
                    :label="btnLabel"
                    :icon="btnIcon"
                    :btnLoading="btnLoading"
                ></BtnMoreItems>
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
const store = useStore();
const route = useRoute();

const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitleImageHero = defineAsyncComponent(() => import("@/components/Content/TitleImageHero.vue"));
const ItemsLists = defineAsyncComponent(() => import('@/components/Items/ItemsList.vue'));
const DsoCard = defineAsyncComponent(() => import('@/components/Items/DsoCard.vue'))
const BtnMoreItems = defineAsyncComponent(() => import('@/components/Content/btnMoreItems.vue'));

import { useStore} from "vuex";
import {useRoute} from "vue-router";
import {ConstellationWs} from "@/repositories/api/constellations";
import {DsoWs} from "@/repositories/api/dso";

// Constellation
const constellationId = ref(route.params.constellationId);
const constellationRef = reactive({});
// DSO
const selectedFilter = ref('all');
const items = ref([]);
const filtersRef = ref([]);
const totalRef = ref(0);
const offset = ref(0);
// Button more
const btnLabel = ref('Show more')
const btnIcon = ref('mdi-plus');
const btnLoading = ref(false);

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
  store.commit('message/setLoading', false);
};

/**
 * Load list of DSO in constellation
 * @returns {Promise<void>}
 */
const fetchDsoByConstellation = async () => {
  try {
    const { data, filters, total} = await DsoWs.GET_DSO_LIST({constellation: constellationId.value}, offset.value, 20);
    items.value = data;
    filtersRef.value = filters;
    totalRef.value = total;
    offset.value += 20;
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

const showMoreItems = async  () => {
  btnLabel.value = 'Load data...';
  btnLoading.value = true;
  try {
    const { data, filters, total} = await DsoWs.GET_DSO_LIST({constellation: constellationId.value}, offset.value, 20);
    items.value = [...items.value, ...data]
    filtersRef.value = filters;
    totalRef.value = total;
    offset.value += 20;
    btnLabel.value = 'Show more';
  } catch (err) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': err.message,
      'httpCode': err.code
    }, { root: true })
  }
  btnLoading.value = false;
}

const filteringItemsByType = () => {
  if ('all' === selectedFilter.value) {
    selectedFilter.value = '';
  }
  items.value.filter((item) => 'type.'+ item.type === selectedFilter.value);
}

const isLoading = computed(() => store.state.message.loading);
const constellationCover = computed(() =>  require(`@/assets/images/constellations/cover/${constellationRef.value.cover}`));
const nbItems = computed(() => items.value.length)
const filtersByType = computed(() => filtersRef.value['type'])
</script>

<style scoped>

</style>