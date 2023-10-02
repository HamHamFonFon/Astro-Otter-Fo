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
      <!-- Open / hide-->
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

      <!-- Social networls -->
      <v-btn
          color="transparent"
          size="50"
          v-for="socialNetwork in socialNetworks"
          v-bind:key="socialNetwork"
          @click="resolveFunction(socialNetwork.funcName, socialNetwork.param)"
      >
        <v-icon size="30">{{ socialNetwork.icon }}</v-icon>
        <v-tooltip
            activator="parent"
            location="left"
            :text="socialNetwork.label"
        ></v-tooltip>
      </v-btn>

      <v-btn
          color="transparent"
          size="50"
          @click="pasteUrl"
      >
        <v-icon size="30" :icon="copyLink.icon" :color="copyLink.color"></v-icon>
        <v-tooltip
            activator="parent"
            location="left"
            :text="copyLink.text"
        ></v-tooltip>
      </v-btn>
    </v-card>
  </transition>
</template>
<script setup>
import {computed, reactive, ref} from "vue";

const showButtons = ref(false);
const showCloseButton = ref(false);
const socialNetworks = reactive([
  // { label: 'TikTok', icon: 'mdi-tiktok'},
  {name: 'instagram', label: 'Share on Instagram', icon: 'mdi-instagram', funcName: 'shareOn', param: ''},
  {name: 'twitter', label: 'Share on  X (ex-Twitter)', icon: 'mdi-twitter', funcName: 'shareOn', param: 'https://twitter.com/intent/tweet?text='},
  {name: 'facebook', label: 'Share on Facebook', icon: 'mdi-facebook', funcName: 'shareOn', param: 'https://www.facebook.com/sharer/sharer.php?u='},
  {name: 'messenger', label: 'Share on Messenger', icon: 'mdi-facebook-messenger', funcName: 'shareOn', param: 'fb-messenger://share/?link='},
  {name: 'whatsapp', label: 'Share on WhatsApp', icon: 'mdi-whatsapp', funcName: 'shareOn', param: 'whatsapp://send?text='},
  {name: 'linkedin', label: 'Share on LinkedIn', icon: 'mdi-linkedin', funcName: 'shareOn', param: 'https://www.linkedin.com/sharing/share-offsite/?url='},
  // {name: 'twitch', label: 'Share on Twitch', icon: 'mdi-twitch'},
  {name: 'email', label: 'Share by email', icon: 'mdi-email', funcName: '', param: 'mailto:?subject=Check this link'},
]);

const copyLink = ref({
  text: 'Copy link',
  icon: 'mdi-bookmark-outline',
  color: 'white'
});


const backgroundColor = computed(() => (screen.width <= 760) ? 'primary': 'transparent')

const shareOn = (socialNetworkUrl) => {
  let shareUrl = socialNetworkUrl + encodeURIComponent(location.href);
  window.open(shareUrl, '_blank');
}

const pasteUrl = () => {
  copyLink.value.text = 'Link copied';
  copyLink.value.icon = 'mdi-check-all';
  copyLink.value.color = 'green';
  navigator.clipboard.writeText(location.href);
}

const resolveFunction = (funcName, param) => {
  if ('shareOn' === funcName) {
    shareOn(param);
  }

  if ('pasteUrl' === funcName) {
    pasteUrl();
  }
  // if (typeof resolveFunction[funcName] === 'function') {
  //   resolveFunction[funcName](param);
  // } else {
  //   console.error(`Function ${funcName} not found`);
  // }
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