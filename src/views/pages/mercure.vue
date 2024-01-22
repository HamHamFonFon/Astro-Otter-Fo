<script setup>

import {onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";

import { mercureConfig } from '@/configs/mercure';
import api from "@/configs/api";
import MercureNotification from "@/components/Items/MercureNotification.vue";

const route = useRoute();
const userName = ref(null);
const notifications = reactive([]);
const usersNotifications = reactive([]);

const getNotifications = () => {
  const url = new URL(mercureConfig.url);
  url.searchParams.append('topic', `${api.API_HOST}/demo`);

  const eventSource = new EventSource(url.toString(), { withCredentials: true});
  eventSource.onmessage = (e) => {
    const response = JSON.parse(e.data);
    notifications.push(response);
  }
}

const getNotificationsForUser = () => {
  usersNotifications.length = 0;
  const urlByUser = new URL(mercureConfig.url);
  urlByUser.searchParams.append('topic', `${api.API_HOST}/demo-user/${userName.value}`);

  const eventSource = new EventSource(urlByUser.toString(), { withCredentials: true});
  eventSource.onmessage = (e) => {
    const response = JSON.parse(e.data);
    usersNotifications.push(response);
  }
}

const deleteItem = (index) => notifications.splice(index, 1);
const deleteUserItem = (index) => usersNotifications.splice(index, 1);

onBeforeMount(() => {
  userName.value = route.query.user;
})
onMounted(() => getNotifications());

watch(userName, () => getNotificationsForUser())
</script>

<template>
  <h1 class="text-h2">MERCURE DEMO</h1>

  <div class="grid-container">

    <div class="grid-child">
      <h2>Global notifications</h2>
      <MercureNotification
        v-for="(notification, index) in notifications"
        v-bind:key="notification"
        :notification="notification"
        @click-remove="deleteItem(index)"
      >
      </MercureNotification>
    </div>

    <div class="grid-child">
      <div>
        <h2>Notification for user {{ userName }}</h2>
        <!-- v-text-field
          v-model="userName"
          variant="outlined"
          color="white"
          clearable
        >
        </v-text-field -->
      </div>
      <hr />

      <MercureNotification
        v-for="(uNotification, index) in usersNotifications"
        v-bind:key="uNotification"
        :notification="uNotification"
        @click-remove="deleteUserItem(index)"
      >
      </MercureNotification>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.grid-child {
  border: 1px solid white;
  padding: 0.5em;
}

</style>
