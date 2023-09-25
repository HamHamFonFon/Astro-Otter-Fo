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
            label="Filter constellations"
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
import {computed, defineAsyncComponent, onBeforeMount, onMounted, ref} from "vue";
import {useStore} from "vuex";
const store = useStore();

import backgroundConstellationImage from '@/assets/images/background/constellations.jpg';

// Components
const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));

const TitleImageHero = defineAsyncComponent(() => import('@/components/Content/TitleImageHero.vue'));
const FilterList = defineAsyncComponent(() => import('@/components/Content/FilterList.vue'));
const ItemsLists = defineAsyncComponent(() => import('@/components/Items/ItemsList.vue'));
const ConstellationCard = defineAsyncComponent(() => import('@/components/Items/ConstellationCard.vue'));

// Datas
const backgroundImage = ref(backgroundConstellationImage);
const filterConstellation = ref(null);

/**
 * Before mount, set Store
 */
onBeforeMount(() => {
  if (88 !== store.getters['constellations/getTotalCount']) {
    store.commit('message/setLoading', false);
    store.commit('constellations/setTotalCount', 0);
  }
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
const fetchListConstellations = () => {
  if (0 === store.getters['constellations/getAllConstellations'].length) {
    store.dispatch('constellations/fetchListConstellations');
  }
}

const isLoading = computed(() => store.state.message.loading);
const constellations = computed(() => {
  const text = filterConstellation.value ?? '';
  if (2 < text.length) {
    return store.state.constellations.constellations.filter(c => c.alt.toLowerCase().startsWith(text.toLowerCase()));
  }
  return store.state.constellations.constellations;
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