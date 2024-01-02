<script setup>
import {computed, onBeforeMount, onMounted, reactive, toRefs} from "vue";

const notifications = reactive([{
  title: 'UPDATE',
  subtitle: 'New data for M42 item'
}]);
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
  }
});

const { btnColor, iconColor } = toRefs(props);

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
  <v-menu class="float-right">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" :color="btnColor" aria-label="{{ $t('layout.notifications')}}">
        <v-badge :content="nbNotifications" :color="iconColor">
          <v-icon :color="iconColor">mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-list elevation="1" density="compact" max-width="400" v-if="0 < nbNotifications">
      <v-list-subheader>Notifications</v-list-subheader>
      <v-list-item v-for="(message, i) in notifications" :key="i">
        <div>
          <v-list-item-title class="font-weight-bold text-primary">{{ message.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ message.subtitle }}</v-list-item-subtitle>
        </div>
      </v-list-item>

      <div class="text-center py-5">
        <v-btn size="small" variant="elevated" elevation="1" @click="clearNotifications"> {{ $t('layout.delete_notifications')}} </v-btn>
      </div>
    </v-list>

  </v-menu>
</template>

<style scoped>

</style>
