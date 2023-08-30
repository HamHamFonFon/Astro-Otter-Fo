<template>
  <transition>
    <Message />
  </transition>
  <transition name="fade">
    <TitleParallax v-if="!isLoading" :url-image="astrobinIOTD.image.urlHd" :title="astrobinIOTD.image.title"></TitleParallax>

  </transition>
</template>

<script>
import {mapState} from "vuex";
import Message from "@/components/Layout/Message.vue";
import TitleParallax from "@/components/Content/TitleParallax.vue";
export default {
  name: "ImageOfTheDay",
  components: {
    TitleParallax,
    Message
  },
  mounted() {
    this.$store.dispatch('astrobinIOTD/fetchImageOfTheDay');
  },
  computed: {
    ...mapState(
        { astrobinIOTD: state => state.astrobinIOTD }
    ),
    isLoading() {
      return this.isLoading
    }
  }
}
</script>

<style scoped>

</style>