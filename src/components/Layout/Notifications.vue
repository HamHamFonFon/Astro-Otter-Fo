<script setup>
import {onMounted} from "vue";

import { VSonner, toast } from 'vuetify-sonner'
import 'vuetify-sonner/style.css'
import { mercureConfig } from '@/configs/mercure';

// let notificationsInterval;

const getNotifications = () => {
  const hubUrl = new URL(mercureConfig.url);
  hubUrl.searchParams.append('topic', `${mercureConfig.topic}`);

  const eventSource = new EventSource(hubUrl.toString(), { withCredentials: true });
  eventSource.onmessage = (e) => {
    console.log(e)
    const response = JSON.parse(e.data);
    console.log(response);

    toast(response.message, {
      description: response.date,
      cardProps: {
        color: 'success'
      },
      prependIcon: 'mdi-check-circle',
      duration: 10000
    });
  };

  // eventSource.onerror = (e) =>  {
    // console.log(e);
    // eventSource.close();
  // }
}

onMounted(() => {
  getNotifications()
})

// onBeforeMount(() => clearInterval(notificationsInterval))
</script>

<template>
  <VSonner expand position="top-right" />
</template>

