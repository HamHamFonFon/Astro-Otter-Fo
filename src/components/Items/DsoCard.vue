<template>
  <v-card
    class="ma-3"
    color="secondary"
  >
<!--    <router-link :to="{ name: 'dso', params: { dtoId: item.id } }">-->
      <v-img
          :src="dso.astrobin.url_hd"
          :lazy-src="dso.astrobin.url_hd"
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
        <v-card-title class="text-h6 text-white">{{ dso.name }}</v-card-title>
      </v-img>
<!--    </router-link>-->
    <v-card-actions color="primary">
      <v-list-item class="w-100"  color="red">
        <template v-slot:prepend>
          <v-icon color="grey" icon="mdi-account" />{{ dso.type }}
        </template>

        <template v-slot:append>
          <div class="justify-self-end">
            <v-icon color="grey" icon="iconConstellation"></v-icon> <span class="subheading me-2">{{ dso.constellation.alt }}</span>
          </div>
        </template>
      </v-list-item>

    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  dso: {
    type: Object
  }
})

</script>

<style scoped>
.v-card-title {
  background-color: rgba(0, 0, 0, 0.5);
}
.v-img {
  border-bottom: solid #1ed760;
}
</style>