<template>
  <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="primary">
    <v-sheet max-width="1600" class="mx-auto pa-5" elevation="0" color="transparent">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="4" v-for="item in items" :key="item.id">
            <DsoCard :dso="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-sheet>
</template>

<script>
import DsoCard from "@/components/Dso/DsoCard.vue";
export default {
  name: "RandomDsoHomepage",
  components: {DsoCard},
  props: {
    // items: {
    //   type: Object,
    //   default: null,
    // }
  },
  data() {
    return {
      items: [
        {dsoId: 'm42', image: 'https://www.astrobin.com/cc5kpv/0/rawthumb/regular/', title: 'Orion nebula', type: '', constellation: 'Orion'},
        {dsoId: 'm31', image: 'https://www.astrobin.com/si8zi0/0/rawthumb/regular/', title: 'Andromeda galaxy', type: 'spiral galaxy', constellation: 'Andromeda'},
        {dsoId: 'ngc7293', image: 'https://www.astrobin.com/379758/0/rawthumb/regular/', title: 'Helix nebula', type: '', constellation: 'Aquila'},
      ]
    }
  }
}
</script>

<style scoped>

</style>