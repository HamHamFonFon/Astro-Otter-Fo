<template>
  <v-card
    class="ma-5"
    color="secondary"
  >
    <router-link :to="{ name: 'dso', params: { id: dso.id } }">
      <v-img
        :src="imageCover"
        :lazy-src="imageLazyCover"
        class="bg-grey-lighten-2"
        height="300"
        cover
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <v-card-title class="text-h6 text-white">{{ title }}</v-card-title>
        <v-card-subtitle v-if="1 < dso.desigs.length" class="text text-white">
          {{ otherDesigs }}
        </v-card-subtitle>
      </v-img>
    </router-link>

    <v-card-text v-if="dso.description">
      {{ dso.description.substring(0, 60) }}&hellip;
    </v-card-text>
    <v-card-actions color="">
      <v-btn text>
        <span class="subheading me-2">{{ dso.typeLabel }}</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text align="right" text-align="right">
        <v-icon class="mr-2" color="grey"><slot name="custom-icon" iconName="constellation"></slot> </v-icon>
        <span class="subheading me-2">
          <router-link :to="{
            name: 'constellation',
            params: {
              constellationId: dso.constellation.id.toLowerCase(),
              constellationName: dso.constellation.alt.toLowerCase()
            }
          }">
            {{ dso.constellation.alt }}
          </router-link>
        </span>
      </v-btn>


    </v-card-actions>
  </v-card>
</template>

<script setup>
import {computed, toRefs} from "vue";
const defaultImage = require('@/assets/images/default.png');

const props = defineProps({
  dso: {
    type: Object
  }
})
const { dso } = toRefs(props);

const imageCover = computed(() => (dso.value.astrobinUser) ? dso.value.astrobin.url_regular: defaultImage );
const imageLazyCover = computed(() => (dso.value.astrobinUser) ? dso.value.astrobin.url_gallery: defaultImage );
const title = computed(() => dso.value.fullNameAlt );
const otherDesigs = computed(() => dso.value.desigs./*filter((v,i,a) => {
  if (props.dso.name === v) {
    a.splice(i, 1);
    return true;
  }
  return false;
}).*/join( ' - '));
</script>

<style scoped>
.v-card-title, .v-card-subtitle  {
  background-color: rgba(0, 0, 0, 0.7);
}
.v-img {
  border-bottom: solid #1ed760;
}
</style>