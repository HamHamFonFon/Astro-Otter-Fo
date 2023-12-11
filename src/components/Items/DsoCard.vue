<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-card
      class="ma-5"
      color="primary"
      style="overflow: hidden"
      :elevation="isHovering ? 12 : 1"
      v-bind="props"
    >
      <router-link :to="{ name: 'dso', params: { id: dso.id } }">
        <v-img
          :src="imageCover"
          :lazy-src="imageLazyCover"
          :class="isHovering ? 'zoom bg-grey-lighten-2': 'bg-grey-lighten-2'"
          height="340"
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
          <v-expand-transition>
            <div v-if="isHovering && false === isDefaultImage" class="d-flex transition-fast-in-fast-out text-white v-card--reveal display-3 white--text" style="height: 100%;">
              <v-card-title class="text-h6 text-white">{{ title }}</v-card-title>
              <v-card-subtitle v-show="false" v-if="1 < dso.desigs.length" class="text-caption text-white">
                {{ otherDesigs }}
              </v-card-subtitle>
            </div>
            <div v-else-if="true === isDefaultImage"  class="d-flex text-white v-card--reveal display-3 white--text" style="height: 100%;">
              <v-card-title class="text-h6 text-white">{{ title }}</v-card-title>
            </div>
          </v-expand-transition>


        </v-img>
      </router-link>

      <v-card-text v-show="false" v-if="dso.description">
        {{ dso.description.substring(0, 60) }}&hellip;
      </v-card-text>

      <v-card-actions color="background">
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
  </v-hover>
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
const isDefaultImage = computed(() => (!dso.value.astrobinUser) );
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

<style scoped lang="scss">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

.v-card-title, .v-card-subtitle  {
  background-color: rgba(0, 0, 0, 0.7);
}

.v-img {
  border-bottom: solid #1ed760;
  .v-image__image { transition: all 0.2s; }
  &.zoom {
    .v-image__image { transform: scale(1.2); }
  }
}

</style>
