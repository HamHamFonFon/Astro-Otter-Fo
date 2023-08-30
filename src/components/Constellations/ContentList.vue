<template>
  <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="transparent">
    <v-sheet class="pa-3" elevation="0" color="transparent">
      <v-container color="transparent">
        <v-row align="center" color="transparent">

          <ItemsLists :items-list="constellations" :columns="4">
            <template v-slot="{ item, index }">
              <ConstellationCard v-bind:key="index" :constellation="item" />
            </template>
          </ItemsLists>

        </v-row>
      </v-container>
    </v-sheet>
  </v-sheet>
</template>

<script>
import ItemsLists from "@/components/Items/ItemsList.vue";
import ConstellationCard from "@/components/Items/ConstellationCard.vue";
export default {
  name: "ContentList",
  components: {
    ItemsLists, ConstellationCard
  },
  props: {
    constellations: Object
  }
}
</script>

<style scoped>

</style>