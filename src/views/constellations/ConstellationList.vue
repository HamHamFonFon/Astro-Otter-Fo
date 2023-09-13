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
        <v-expansion-panels bg-color="secondary">
          <v-expansion-panel bg-color="secondary">
            <v-expansion-panel-title color="secondary">
              Filtering constellations
            </v-expansion-panel-title>
            <v-expansion-panel-text bg-color="secondary">
              <v-row class="" align="center" justify="center">
                  <v-radio-group inline v-model="filteringConstellation">
                    <v-radio label="All" value="all"></v-radio>
                    <v-radio label="Northern hemisphere" value="north"></v-radio>
                    <v-radio label="Southern hemisphere" value="south"></v-radio>
                    <v-radio label="Zodiac" value="zodiac"></v-radio>
                  </v-radio-group>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="transparent">
          <v-sheet class="pa-3" elevation="0" color="transparent">
            <v-container>
              <v-row align="center">
                <ItemsLists :items-list="constellations.constellations" :columns="4">
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
import { useStore} from "vuex";
const store = useStore();
import backgroundConstellationImage from '@/assets/images/background/constellations.jpg';

// Components
const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitleImageHero = defineAsyncComponent(() => import('@/components/Content/TitleImageHero.vue'));

const ItemsLists = defineAsyncComponent(() => import('@/components/Items/ItemsList.vue'));
const ConstellationCard = defineAsyncComponent(() => import('@/components/Items/ConstellationCard.vue'));

// Datas
// const filters = ref(['All', 'Nothern hemisphere', 'Southern hemisphere', 'Zodiac']);
// const activeFilter = ref('All');
const backgroundImage = ref(backgroundConstellationImage);
const filteringConstellation = reactive({});

//
onBeforeMount(() => {
  store.commit('message/setLoading', false);
  store.commit('constellations/setTotalCount', 0);
})

// Functions
const fetchListConstellations = () => {
  store.dispatch('constellations/fetchListConstellations');
}

onMounted(() => {
  fetchListConstellations();
})

const constellations = computed(() => store.state.constellations);
const isLoading = computed(() => store.state.message.isLoading);
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