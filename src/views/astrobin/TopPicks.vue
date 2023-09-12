<template>
  <TitlePage :title="title"></TitlePage>
</template>

<script setup>
import {defineAsyncComponent, ref} from "vue";

const TitlePage = defineAsyncComponent(() => import('@/components/Content/TitlePage.vue'));
const title = ref('Top-picks');
</script>

<style scoped>

</style>