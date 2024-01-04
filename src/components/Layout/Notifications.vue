<script setup>
import {onBeforeMount, onMounted} from "vue";

import { VSonner, toast } from 'vuetify-sonner'
import 'vuetify-sonner/style.css'
let notificationsInterval;

// const props = defineProps({
//   btnColor: {
//     type: String,
//     default: ''
//   },
//   iconColor: {
//     type: String,
//     default: 'text-grey'
//   },
//   bgColor: {
//     type: String,
//     default: 'background'
//   }
// });

// const { btnColor, iconColor, bgColor } = toRefs(props);

import { mercureConfig } from '@/configs/mercure';

const getNotifications = () => {
  const hubUrl = new URL(mercureConfig.url);
  const domain = 'https://api.astro-otter.space'
  const topic = mercureConfig.topic;

  hubUrl.searchParams.append('topic', `${domain}/${topic}`);

  const eventSource = new EventSource(hubUrl.toString(), { withCredentials: true });
  eventSource.onmessage = ({data}) => {
    const response = JSON.parse(data);
    console.log(response);
    toast(response.message, {
      description: 'Monday, January 4rd at 6:00pm',
      cardProps: {
        color: 'success'
      },
      prependIcon: 'mdi-check-circle',
      duration: -1
    });
  }
}

onMounted(() => {
  notificationsInterval = setInterval(() => getNotifications(), 10000);
})

onBeforeMount(() => clearInterval(notificationsInterval))
</script>

<template>
  <VSonner expand position="top-right" />
</template>
