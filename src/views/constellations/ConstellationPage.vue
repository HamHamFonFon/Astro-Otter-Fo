<template>
  <transition name="fade" v-if="constellation">
    <h2>{{ constellation.title }}</h2>
  </transition>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ConstellationPage",
  data () {
    return {
      constellationId: null
    }
  },
  mounted() {
    this.constellationId = this.$route.params.constellationId;
    this.$store.dispatch('constellations/fetchConstellationById', this.constellationId);
  },
  computed: {
    ...mapGetters({'constellation': 'constellations/getConstellationById'}),
    // constellation() {
    //   return this.$store.getters['constellations/getConstellationById'](this.constellationId)
    // }
  }
}
</script>

<style scoped>

</style>