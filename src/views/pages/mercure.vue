<script setup>

import {onMounted, reactive, ref, watch} from "vue";
import { mercureConfig } from '@/configs/mercure';
import api from "@/configs/api";

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

const deleteItem = (index) =>  notifications.splice(index, 1);
const deleteUserItem = (index) => usersNotifications.splice(index, 1);

onMounted(() => {
  getNotifications();

});

watch(userName, () => getNotificationsForUser())
</script>

<template>
  <h1>MERCURE DEMO</h1>

  <div class="grid-container">

    <div class="grid-child">
      <h2>Global notifications</h2>
      <div class="Message" v-for="(notification, i) in notifications" v-bind:key="notification">
        <div class="Message-body">
          <p>{{ notification.message }}</p>
        </div>
        <button class="Message-close js-messageClose" @click="deleteItem(i)"><v-icon icon="mdi-close"></v-icon></button>
      </div>
    </div>

    <div class="grid-child">
      <div>
        <h2>Notification for user {{ userName }}</h2>
        <v-text-field
          v-model="userName"
          variant="outlined"
          color="white"
          clearable
        >
        </v-text-field>
      </div>
      <hr />
      <div class="Message" v-for="(notification, i) in usersNotifications" v-bind:key="notification">
        <div class="Message-body">
          <p>{{ notification.message }}</p>
        </div>
        <button class="Message-close js-messageClose" @click="deleteUserItem(i)"><v-icon icon="mdi-close"></v-icon></button>
      </div>
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

.Message {
  display: table;
  position: relative;
  margin: 1em auto 0;
  width: 500px;
  border-radius: 5px;
  background-color: #3E8ED0;
  color: #F3FDFB;
  transition: all 0.2s ease;

  &.is-hidden {
    opacity: 0;
    height: 0;
    font-size: 0;
    padding: 0;
    margin: 0 auto;
    display: block;
  }
}

.Message-body {
  display: table-cell;
  vertical-align: middle;
  padding: 1em 20px;
  color: #fff;
}

.Message-close {
  padding: 0.25px;
  border-radius: 50%;
  position: absolute;
  background-color: rgba(black, 0.3);
  color: #fff;
  border: none;
  outline: none;
  font-size: 12px;
  right: 5px;
  top: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(black, 0.5);
  }
}
</style>
