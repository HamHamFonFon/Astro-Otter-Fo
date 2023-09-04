<template>
  <v-card
      class="ma-3"
      color="secondary"
  >
    <a :href="astrobinImageUrl(item.id)" target="_blank">
      <v-img
          :src="item.image"
          :lazy-src="item.lazyImage"
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
        <v-card-title class="text-h6 text-white">{{ item.title }}</v-card-title>
      </v-img>
    </a>
    <v-card-actions color="primary">
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-icon color="grey" icon="mdi-account" />{{ item.user }}
        </template>
        <template v-slot:append>
          <div class="justify-self-end">
            <v-icon icon="mdi-eye" color="grey"></v-icon> <span class="subheading me-2">{{ item.views }}</span>
            <v-icon icon="mdi-heart" color="grey"></v-icon> <span class="subheading me-2">{{ item.likes }}</span>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "@/configs/api";
export default {
  name: "AstrobinCard",
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    astrobinImageUrl: (imageId) => {
      return api.ASTROBIN_HOST + '/' + imageId;
    }
  }
}
</script>

<style scoped>
.v-card-title {
  background-color: rgba(0, 0, 0, 0.5);
}
.v-img {
  border-bottom: solid #1ed760;
}
.v-img:hover {
  cursor: pointer;
}
</style>