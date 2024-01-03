<script setup>
import {computed, onBeforeMount, onMounted, reactive, toRefs} from "vue";

const notifications = reactive([
  {
    type: 'update',
    title: 'New update',
    subtitle: 'M42 item have been updated',
    icon: 'mdi-star-check-outline'
  },
  {
    type: 'create',
    title: 'New object',
    subtitle: 'New object Sh2-999 have been added in catalog',
    icon: 'mdi-star-plus-outline'
  }
]);
const nbNotifications = computed(() => notifications.length);
let notificationsInterval;

const props = defineProps({
  btnColor: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: 'text-grey'
  },
  bgColor: {
    type: String,
    default: 'background'
  }
});

const { btnColor, iconColor, bgColor } = toRefs(props);

import { mercureConfig } from '@/configs/mercure';

const getNotifications = () => {
  const hubUrl = new URL(mercureConfig.url);
  const domain = 'https://api.astro-otter.space'
  const topic = mercureConfig.topic;

  hubUrl.searchParams.append('topic', `${domain}/${topic}`);

  const eventSource = new EventSource(hubUrl.toString(), {withCredentials: true});
  eventSource.onmessage = (event) => {
    console.log(event.data);
    notifications.push({});

    nbNotifications.value = notifications.length;
  }
}
const clearNotifications = () => {
  notifications.length = 0;
};

onMounted(() => {
  notificationsInterval = setInterval(() => getNotifications(), 10000);
})

onBeforeMount(() => clearInterval(notificationsInterval))

</script>

<template>
  <v-menu class="float-right" transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" :color="btnColor" aria-label="{{ $t('layout.notifications') }}">
        <v-badge :content="nbNotifications" :color="iconColor">
          <v-icon :color="iconColor">mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-list elevation="1" density="compact" max-width="400" v-if="0 < nbNotifications" :bg-color="bgColor">
      <v-list-subheader>{{ $t('layout.notifications') }}</v-list-subheader>
      <v-list-item v-for="(message, i) in notifications" :key="i">
        <template v-slot:prepend>
          <v-avatar size="40">
            <v-icon :color="iconColor">{{ message.icon }}</v-icon>
          </v-avatar>
        </template>
        <div>
          <v-list-item-title class="font-weight-bold text-primary">{{
              message.title
            }}</v-list-item-title>
          <v-list-item-subtitle>{{ message.subtitle }}</v-list-item-subtitle>
        </div>
      </v-list-item>

      <div class="text-center py-5">
        <v-btn size="small" variant="outlined"
               class="text-white mr-5"
               color="grey" @click="clearNotifications"> {{ $t('layout.delete_notifications')}} </v-btn>
      </div>
    </v-list>

  </v-menu>
</template>

<style scoped>

</style>
