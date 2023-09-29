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

              <v-row>
                <v-col cols="12" sm="4" v-for="(array, key) in filtersBy" v-bind:key="key">
                  <v-select
                      v-model="selectedFilter[key]"
                      :label="key"
                      variant="outlined"
                      :items="array"
                      item-title="label"
                      item-value="name"
                      @update:modelValue="fetchDsoByConstellation"
                      clearable
                  >
                  </v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12">
                  <span class="text-white">{{ nbItems }} items on {{ totalRef }}</span>
                </v-col>
              </v-row>

              <v-row align="center">
                <ItemsLists :items-list="items" :columns="4">
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
const selectedFilter = reactive({});
const items = ref([]);
const filtersRef = ref([]);
const totalRef = ref(0);
const offset = ref(0);
const limit = ref(20);

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
    let params = {
      ...{constellation: constellationId.value},
      ...selectedFilter
    };
    const { data, filters, total} = await DsoWs.GET_DSO_LIST(params, 0, limit.value);
    items.value = data;
    filtersRef.value = filters;
    totalRef.value = total;
    offset.value = 20;
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
    let params = {
      ...{constellation: constellationId.value},
      ...selectedFilter
    };
    const { data, filters, total} = await DsoWs.GET_DSO_LIST(params, offset.value, limit.value);
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

const isLoading = computed(() => store.state.message.loading);
const constellationCover = computed(() =>  require(`@/assets/images/constellations/cover/${constellationRef.value.cover}`));
const nbItems = computed(() => items.value.length)
const filtersBy = computed(() => {
  return Object.keys(filtersRef.value)
    .filter((type) => type !== 'constellation')
    .reduce((obj, key) => {
      return Object.assign(obj, {
        [key]: filtersRef.value[key]
      });
    }, {})
});
</script>

<style scoped>

</style>