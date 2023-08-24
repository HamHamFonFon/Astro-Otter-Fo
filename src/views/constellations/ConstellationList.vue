<template>
    <v-parallax
        :src="backgroundImage"
        height="400"
    >
      <v-row class="w-auto fill-height" align="center" justify="center">
        <div class="text-h2 text-white">
          <div class="text-h4 text-white">Constellations</div>
        </div>
      </v-row>
    </v-parallax>

  <transition name="fade">
    <Message />
  </transition>

  <!--  list constellations  -->
  <transition name="fade">
    <div v-if="!isLoading && constellations">
      <div v-for="(constellation,index) in constellations" v-bind:key="index" >
          <span class="text-white">{{ constellation.title }}</span>
      </div>
    </div>

  </transition>
</template>

<script>
import { mapState } from "vuex";
import backgroundImage from '@/assets/images/background/constellations.jpg'

import Message from "@/components/Layout/Message.vue";

export default {
  name: "ConstellationList",
  data () {
    return {
      backgroundImage: null
    }
  },
  components: {
    Message
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
      return this.loading;
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