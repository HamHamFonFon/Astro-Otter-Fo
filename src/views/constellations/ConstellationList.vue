<template>
  <TitleImageHero title="Constellations" :url-image="backgroundImage"></TitleImageHero>

  <transition name="fade">
    <Message />
  </transition>

  <!--  list constellations  -->
  <transition name="fade">
    <v-sheet
        elevation="0"
        class="landing-warpper"
        color="transparent"
        v-if="!isLoading"
    >

      <v-container class="text-left">
        <FilterList
          v-model="filterConstellation"
          label="Filtering constellations"
          placeholder="Filter by name (e.q. 'Orion', 'Andromeda')..."
        />

        <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="transparent">
          <v-sheet class="pa-3" elevation="0" color="transparent">
            <v-container>
              <v-row align="center">
                <ItemsLists :items-list="constellations" :columns="5">
                  <template v-slot="{ item, index }">
                    <ConstellationCard v-bind:key="index" :item="item" />
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
const store = useStore();

import backgroundConstellationImage from '@/assets/images/background/constellations.jpg';
import {ConstellationWs} from "@/repositories/api/constellations";

// Components
const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitleImageHero = defineAsyncComponent(() => import('@/components/Content/TitleImageHero.vue'));
const FilterList = defineAsyncComponent(() => import('@/components/Content/FilterList.vue'));
const ItemsLists = defineAsyncComponent(() => import('@/components/Items/ItemsList.vue'));
const ConstellationCard = defineAsyncComponent(() => import('@/components/Items/ConstellationCard.vue'));

// Datas
const backgroundImage = ref(backgroundConstellationImage);
const constellationsRef = reactive([]);
const filterConstellation = ref(null);

/**
 * Before mount, set Store
 */
onBeforeMount(() => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': 'Loading constellations list...',
    'httpCode': null
  }, { root: true });
})

/**
 * OnMount, fetch list constellation function
 */
onMounted(() => {
  fetchListConstellations();
})

/**
 * Functions
 */
const fetchListConstellations = async () => {
  try {
    const constellationResponse = await ConstellationWs.GET_CONSTELLATION_LIST();
    constellationResponse.forEach(c => constellationsRef.push(c));
    store.commit('message/setMessage', {
      'type': 'success',
      'loading': false,
      'message': 'Constellations loaded',
      'httpCode': 200
    }, { root: true });
  } catch (error) {
    store.commit('message/setMessage', {
      'loading': true, // CHANGE IT
      'type': 'error',
      'message': error.message,
      'httpCode': error.code
    }, { root: true });
  }

  setTimeout(function() {
    store.commit('message/setLoading', false);
  }, 1000);
}

const isLoading = computed(() => store.state.message.loading);
const constellations = computed(() => {
  const text = filterConstellation.value ?? '';
  const listConstellationSorted = [...constellationsRef].sort((a, b) => (a.id.toLowerCase() < b.id.toLowerCase()) ? -1 : ((b.id.toLowerCase() < a.id.toLowerCase()) ? 1 : 0))
  if (2 < text.length) {
    return listConstellationSorted.filter(c => c.alt.toLowerCase().startsWith(text.toLowerCase()));
  }
  return listConstellationSorted;
});
</script>
