<template>
  <transition name="fade">
    <Message />
  </transition>

  <transition name="fade">
    <v-sheet
        elevation="0"
        class="landing-warpper"
        color="transparent"
        v-if="!isLoading"
    >

      <TitleParallax :url-image="astrobinIOTD.image.urlHd" :title="astrobinIOTD.image.title"></TitleParallax>

      <v-toolbar height="30">
        <v-toolbar-title class="text-h6 align-center">
          This product uses the AstroBin API but is not endorsed or certified by AstroBin.
        </v-toolbar-title>
      </v-toolbar>

      <v-container class="text-left">
        <v-sheet elevation="1" class="mx-auto landing-warpper" rounded color="transparent">
          <v-sheet class="pa-3" elevation="0" color="transparent">
            <v-container>
              <v-row align="center">
                <ItemsLists :items-list="sortedTodayImage" :columns="4">
                  <template v-slot="{ item, index }">
                    <AstrobinCard v-bind:key="index" :item="item" />
                  </template>
                </ItemsLists>
              </v-row>
            </v-container>
          </v-sheet>
        </v-sheet>
      </v-container>

    </v-sheet>
  </transition>
</template>

<script>
import {mapGetters, mapState} from "vuex";

import Message from "@/components/Layout/Message.vue";
import TitleParallax from "@/components/Content/TitleParallax.vue";
import ItemsLists from "@/components/Items/ItemsList.vue";
import AstrobinCard from "@/components/Items/AstrobinCard.vue";
export default {
  name: "ImageOfTheDay",
  components: {
    AstrobinCard,
    ItemsLists,
    TitleParallax,
    Message
  },
  mounted() {
    this.$store.dispatch('astrobinIOTD/fetchImageOfTheDay');
    this.$store.dispatch('astrobinIOTD/fetchListImagesOfTheDay')
  },
  computed: {
    ...mapState(
        { astrobinIOTD: state => state.astrobinIOTD }
    ),
    ...mapGetters({
      sortedTodayImage: 'astrobinIOTD/sortedTodayImages'
    }),
    isLoading() {
      return this.isLoading
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>