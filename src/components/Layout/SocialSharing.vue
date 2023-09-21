<template>
  <v-btn
    :color="backgroundColor"
    @click="$event => showButtons = !showButtons"
    class="hover-button elevation-10"
  >
    <v-icon v-if="!showCloseButton">mdi-share-variant</v-icon>
    <v-icon v-else>mdi-close</v-icon>
  </v-btn>
  <v-divider />
  <transition name="slide-y">
    <v-card
        v-if="showButtons"
        elevation="10"
        class="d-flex flex-column mb-1 hovered-buttons"
        :color="backgroundColor"
    >
      <v-btn
          @click="showButtons = false"
          variant="text"
          size="50"
          color="error"
      >
        <v-icon size="30">mdi-close</v-icon>
        <v-tooltip
            activator="parent"
            location="left"
            text="Close"
        ></v-tooltip>
      </v-btn>
      <v-divider />
      <v-btn color="transparent" size="50" v-for="socialNetwork in socialNetworks" v-bind:key="socialNetwork" @click="sharePage">
        <v-icon size="30">{{ socialNetwork.icon }}</v-icon>
        <v-tooltip
            activator="parent"
            location="left"
            :text="socialNetwork.label"
        ></v-tooltip>
        <v-divider />
      </v-btn>
    </v-card>
  </transition>
</template>
<script setup>
import {computed, reactive, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const showButtons = ref(false);
const showCloseButton = ref(false);
const socialNetworks = reactive([
  // { label: 'TikTok', icon: 'mdi-tiktok'},
  { label: 'Share on Instagram', icon: 'mdi-instagram'},
  { label: 'Share on  X (ex-Twitter)', icon: 'mdi-twitter'},
  { label: 'Share on Facebook', icon: 'mdi-facebook'},
  { label: 'Share on WhatsApp', icon: 'mdi-whatsapp'},
  { label: 'Share on Messenger', icon: 'mdi-facebook-messenger'},
  { label: 'Share on LinkedIn', icon: 'mdi-linkedin'},
  { label: 'Share on Twitch', icon: 'mdi-twitch'},
  { label: 'Share with an eMail', icon: 'mdi-email'},]);
const currentRoute = ref(route.path);

// watch(showButtons, (newValue) => {
//   showCloseButton.value = newValue;
// });

const sharePage = () => {
  alert(currentRoute.value);
};

const backgroundColor = computed(() => (screen.width <= 760) ? 'primary': 'transparent')

</script>

<style scoped>
/* Add your CSS styling here */
.hover-button {
  position: fixed;
  transition: all 0.3s ease;
  bottom: 100px;
  right: 5px;
  z-index: 999;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  cursor: pointer;
}

.hovered-buttons {
  z-index: 999;
  position: fixed;
  bottom: 150px;
  right: 5px;
}
</style>