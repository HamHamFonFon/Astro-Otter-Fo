<template>
  <v-app>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script setup>
import { provide, shallowRef} from "vue";
import router from "@/router";
import layouts from "@/layouts";

const layout = shallowRef('div');
router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || layouts['default']
});
provide('app:layout', layout);
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300|Source+Sans+Pro:300&display=swap');
#app {
  font-family: 'Source Sans Pro', 'Open Sans';
  font-size: large;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}

a {
  text-decoration: none;
  all: unset;
}

</style>
