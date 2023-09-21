<template>
  <v-btn
    :color="backgroundColor"
    @click="$event => showButtons = !showButtons"
    class="hover-button elevation-10"
  >
    <v-icon color="green" v-if="!showCloseButton">mdi-share-variant</v-icon>
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
      <v-btn color="transparent" size="50" v-for="socialNetwork in socialNetworks" v-bind:key="socialNetwork" @click="shareOn(socialNetwork.share)">
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
  {name: 'instagram', label: 'Share on Instagram', icon: 'mdi-instagram', share: ''},
  {name: 'twitter',  label: 'Share on  X (ex-Twitter)', icon: 'mdi-twitter', share: 'https://twitter.com/intent/tweet?text='},
  {name: 'facebook',  label: 'Share on Facebook', icon: 'mdi-facebook', share: 'https://www.facebook.com/sharer/sharer.php?u='},
  {name: 'messenger',  label: 'Share on Messenger', icon: 'mdi-facebook-messenger', share: 'fb-messenger://share/?link='},
  {name: 'whatsapp',  label: 'Share on WhatsApp', icon: 'mdi-whatsapp', share: 'whatsapp://send?text='},
  {name: 'linkedin',  label: 'Share on LinkedIn', icon: 'mdi-linkedin', share: 'https://www.linkedin.com/sharing/share-offsite/?url='},
  // {name: 'twitch',  label: 'Share on Twitch', icon: 'mdi-twitch'},
  {name: 'email',  label: 'Share by email', icon: 'mdi-email', share: 'mailto:?subject=Check this link'},
]);
const currentRoute = ref(route.path);

const backgroundColor = computed(() => (screen.width <= 760) ? 'primary': 'transparent')

const shareOn = (socialNetworkUrl) => {
  let absolutePageUrl = location.origin + currentRoute.value
  let shareUrl = socialNetworkUrl + encodeURIComponent(absolutePageUrl);
  window.open(shareUrl, '_blank');
}


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
  box-shadow: 1px 1px 9px #1ed760;
  transition: all 0.3s;
  cursor: pointer;
}
.hover-button:hover {
  box-shadow: 1px 1px 18px green;
  transition: all 0.5s;
}

.hovered-buttons {
  z-index: 999;
  position: fixed;
  bottom: 150px;
  right: 5px;
}
</style>