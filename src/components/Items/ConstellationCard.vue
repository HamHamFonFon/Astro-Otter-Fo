<template>
  <v-card
      class="ma-3"
      color="transparent"
  >
    <!--    <router-link :to="{ name: 'dso', params: { dtoId: item.id } }">-->
    <v-img
        :src="constellation.image"
        :lazy-src="constellation.image"
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
      <v-card-title class="text-h6 text-white">{{ constellation.title }}</v-card-title>
    </v-img>
    <!--    </router-link>-->
    <v-card-actions :style="{ backgroundColor: '#0D1117' }">
      <v-list-item class="w-100"  color="red">
        <template v-slot:prepend>
          <v-icon color="grey" icon="mdi-account" />{{ constellation.title }}
        </template>
      </v-list-item>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ConstellationCard",
  props: {
    constellation: Object
  }
}
</script>

<style scoped>

</style>