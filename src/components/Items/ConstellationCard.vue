<template>
  <v-card
      class="ma-3"
      color="transparent"
  >
    <router-link :to="{name: 'constellation', params: { constellationId: item.constId } }">
      <v-img
          :src="item.image"
          :lazy-src="item.image"
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
        <v-card-title class="text-center text-h6 text-white">{{ item.title }}</v-card-title>
      </v-img>

      <v-card-actions color="primary">
        <v-list-item class="w-100"  color="red">
          <template v-slot:prepend>
            {{ item.title }}
          </template>
        </v-list-item>
      </v-card-actions>
    </router-link>
  </v-card>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    default: null
  }
});
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
</style>