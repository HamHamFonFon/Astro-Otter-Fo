<template>
  <Notifications />
  <v-app>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script setup>
import {defineAsyncComponent, provide, shallowRef} from "vue";
import router from "@/router";
import layouts from "@/layouts";

const layout = shallowRef('div');
const Notifications = defineAsyncComponent(() => import('@/components/Layout/Notifications.vue'));
router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || layouts['default']
});
provide('app:layout', layout);
</script>

<style lang="scss">

</style>
