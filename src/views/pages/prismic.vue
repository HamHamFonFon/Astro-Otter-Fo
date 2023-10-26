<template>
  <transition name="fade">
    <Message />
  </transition>
  <transition name="fade">
    <v-sheet
        elevation="0"
        class="landing-warpper"
        color="transparent"
        v-if="!isLoading"
    >
      <TitlePage :title="titlePage" />

      <v-container class="text-justify" >
        <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="secondary">
          <v-sheet class="pa-3" elevation="0" color="transparent">
            <v-container>
              <div v-html="contentPage"></div>
              <v-divider></v-divider>
              {{ updatedPage }}
            </v-container>
          </v-sheet>
        </v-sheet>
      </v-container>
    </v-sheet>
  </transition>

</template>

<script setup>
import {computed, defineAsyncComponent, onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import { usePrismic } from '@prismicio/vue'
import store from "@/store";

const route = useRoute();
const { client, asText, asHTML, asDate } = usePrismic()
const TitlePage = defineAsyncComponent(() => import('@/components/Content/TitlePage.vue'));

const prismicData = reactive({
  title: null,
  last_update: null,
  image_header: { url: '', alt: '' },
  content: null,
});
const uid = ref(route.params.uid);

onMounted(() => {
  store.commit('message/setLoading', false);
  fetchPriscmicData(uid.value)
})

const fetchPriscmicData = async (uid) => {
  try {
    const document = await client.getByUID('editorial_page', uid, { lang: 'en-gb' });
    prismicData.title = document.data.title;
    prismicData.image_header = document.data.image_header;
    prismicData.content = document.data.content;
    document.last_update = document.data.last_update;
    store.commit('message/setLoading', false);
  } catch (err) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': err.message,
      'httpCode': err.code
    }, { root: true })
  }
};

const isLoading = computed(() => store.state.message.loading);
const titlePage = computed(() => asText(prismicData.title) );
const contentPage = computed(() => asHTML(prismicData.content))
const updatedPage = computed(() => asDate(prismicData.last_update))
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>