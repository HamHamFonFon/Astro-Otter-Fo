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

  <!--  list constellations  -->
</template>

<script>
import backgroundImage from '@/assets/images/background/constellations.jpg'
import {mapState} from "vuex";
export default {
  name: "ConstellationList",
  data () {
    return {
      backgroundImage: null
    }
  },
  mounted() {
    this.backgroundImage = backgroundImage;
    this.store.dispatch("constellations/fetchConstellations");
  },
  computed: {
    ...mapState({ constellations: state => state.constellations })

  }

}
</script>

<style scoped>

</style>