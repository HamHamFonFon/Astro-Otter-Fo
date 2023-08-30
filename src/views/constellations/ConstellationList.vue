<template>
  <TitleImageHero title="Constellations" :url-image="backgroundImage"></TitleImageHero>

  <transition name="fade">
    <Message />
  </transition>

  <!--  list constellations  -->
  <transition name="fade">
    <ContentList v-if="!isLoading" :constellations="constellations" />
  </transition>
</template>

<script>
import { mapState } from "vuex";
import backgroundImage from '@/assets/images/background/constellations.jpg'
import Message from "@/components/Layout/Message.vue";
import TitleImageHero from "@/components/Content/TitleImageHero.vue";
import ContentList from "@/components/Constellations/ContentList.vue";

export default {
  name: "ConstellationList",
  data () {
    return {
      backgroundImage: null
    }
  },
  components: {
    TitleImageHero,
    Message,
    ContentList
  },
  created() {
    this.$store.commit('message/setLoading', false);
    this.$store.commit('constellations/setTotalCount', 0);
  },
  mounted() {
    this.backgroundImage = backgroundImage;
    this.$store.dispatch('constellations/fetchConstellations');
  },
  computed: {
    ...mapState({ constellations: state => state.constellations }),
    isLoading() {
      return this.isLoading;
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