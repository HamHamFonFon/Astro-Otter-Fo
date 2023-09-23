<template>
  <v-card
    class="ma-3"
    color="secondary"
  >
<!--    <router-link :to="{ name: 'dso', params: { dtoId: item.id } }">-->
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
      </v-img>
<!--    </router-link>-->
    <v-card-text v-if="1 < dso.desigs.length">
      {{ otherDesigs }}
    </v-card-text>
    <v-card-actions color="primary">
      <v-list-item class="w-100"  color="red">
        <template v-slot:prepend>
          <v-icon color="grey" icon="mdi-account" />{{ dso.type }}
        </template>

        <template v-slot:append>
          <div class="justify-self-end">
            <v-icon color="grey"><slot name="custom-icon" iconName="constellation"></slot> </v-icon>
            <span class="subheading me-2">{{ dso.constellation.alt }}</span>
          </div>
        </template>
      </v-list-item>

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

const imageCover = computed(() => (props.dso.astrobinUser) ? props.dso.astrobin.url_regular: defaultImage );
const imageLazyCover = computed(() => (props.dso.astrobinUser) ? props.dso.astrobin.url_gallery: defaultImage );
const title = computed(() => props.dso.fullNameAlt );
const otherDesigs = computed(() => props.dso.desigs./*filter((v,i,a) => {
  if (props.dso.name === v) {
    a.splice(i, 1);
    return true;
  }
  return false;
}).*/join( ' - '));
</script>

<style scoped>
.v-card-title {
  background-color: rgba(0, 0, 0, 0.5);
}
.v-img {
  border-bottom: solid #1ed760;
}
</style>