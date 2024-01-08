<script setup>
import {onBeforeMount, onMounted} from "vue";

import { VSonner, toast } from 'vuetify-sonner'
import 'vuetify-sonner/style.css'
import { mercureConfig } from '@/configs/mercure';

let notificationsInterval;

const getNotifications = () => {
  const hubUrl = new URL(mercureConfig.url);
  hubUrl.searchParams.append('topic', `${mercureConfig.topic}`);

  const eventSource = new EventSource(hubUrl.toString(), { withCredentials: false });
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
  };

  eventSource.onerror = (e) =>  {
    console.log(e);
    eventSource.close();
  }
}

onMounted(() => {
  getNotifications()
})

onBeforeMount(() => clearInterval(notificationsInterval))
</script>

<template>
  <VSonner expand position="top-right" />
</template>

