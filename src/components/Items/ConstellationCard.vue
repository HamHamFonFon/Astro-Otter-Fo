<template>
  <v-card
      class="ma-3"
      color="primary"
  >
    <router-link :to="{name: 'constellation', params: { constellationId: item.id.toLowerCase(), constellationName: item.alt.toLowerCase() } }">
      <v-img
          :src="cover"
          :lazy-src="cover"
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
        <v-card-title class="text-center text-h6 text-white">{{ item.alt }}</v-card-title>
      </v-img>

      <v-card-actions color="background">
        <v-list-item class="w-100">
          <template v-slot:prepend>
            {{ item.generic }}
          </template>
        </v-list-item>
      </v-card-actions>
    </router-link>
  </v-card>
</template>

<script setup>
import { onMounted, ref} from "vue";
const cover = ref(null);

const props = defineProps({
  item: {
    type: Object,
    default: null
  }
});

onMounted(() => {
  try {
    getCoverUrl();
  } catch (error) {
    console.error(`Error loading cover file ${props.item.cover}`, error);
  }
});

const getCoverUrl = async () => {
  cover.value = (await import(`@/assets/images/constellations/cover/${props.item.cover}`)).default;
}

</script>

<style scoped>
.v-card-title {
  background-color: rgba(0, 0, 0, 0.5);
}
.v-img {
  border-bottom: solid #1ed760;
}

a {
  text-decoration: none;
}
.v-img:hover {
  cursor: pointer;
}
</style>