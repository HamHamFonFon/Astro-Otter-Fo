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

<script>
import { mapState } from "vuex";
import backgroundImage from '@/assets/images/background/constellations.jpg'
import Message from "@/components/Layout/Message.vue";
import TitleImageHero from "@/components/Content/TitleImageHero.vue";
import ItemsLists from "@/components/Items/ItemsList.vue";
import ConstellationCard from "@/components/Items/ConstellationCard.vue";
import {ref} from "vue";
// import ItemsLists from "@/components/Items/ItemsList.vue";

export default {
  name: "ConstellationList",
  data () {
    return {
      backgroundImage: null,
      filteringConstellation: ''
    }
  },
  components: {
    ConstellationCard,
    ItemsLists,
    TitleImageHero,
    Message,
    // ContentList
  },
  created() {
    this.$store.commit('message/setLoading', false);
    this.$store.commit('constellations/setTotalCount', 0);
  },
  mounted() {
    this.backgroundImage = backgroundImage;
    this.$store.dispatch('constellations/fetchListConstellations');
  },
  computed: {
    ...mapState({ constellations: state => state.constellations }),
    isLoading() {
      return this.isLoading;
    }
  },
  setup() {
    const filters = ref(['All', 'Nothern hemisphere', 'Southern hemisphere', 'Zodiac']);
    const activeFilter = ref('All');

    return {
      filters,
      activeFilter
    }
  }
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