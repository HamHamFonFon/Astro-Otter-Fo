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
        <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="background">
          <v-sheet class="pa-3" elevation="0" color="transparent">
            <v-container>
              <div class="richtext" v-html="contentPage"></div>
              <v-divider></v-divider>
              <p>{{ updatedPage }}</p>
            </v-container>
          </v-sheet>
        </v-sheet>
      </v-container>
    </v-sheet>
  </transition>

</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import { usePrismic } from '@prismicio/vue'

const route = useRoute();
const router = useRouter();
const store = useStore();
const { client, asText, asHTML, asDate } = usePrismic()

import {applySeo} from "@/services/seo";
import Trans from "@/services/translation";
const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const TitlePage = defineAsyncComponent(() => import('@/components/Content/TitlePage.vue'));

const prismicData = reactive({
  title: null,
  last_update: null,
  image_header: { url: '', alt: '' },
  content: null,
  seo_title: null,
  seo_description: null
});
const uid = ref(route.params.uid);

onBeforeMount(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': `Please wait while loading ${uid.value} data...`,
    'httpCode': null
  });
})
onMounted(async () => {
  store.commit('message/setLoading', false);
  await fetchPriscmicData();
  applySeo({
    title: seoTitle,
    description: seoDesc,
    image: null,
    imageAlt: null,
    fullUrl: route.fullPath
  })
})
watch(
  () => route.params.uid,
  async newUid => {
    uid.value = newUid;
    await fetchPriscmicData();
  }
)

/**
 *
 * @returns {Promise<void>}
 */
const fetchPriscmicData = async () => {
  try {
    const document = await client.getByUID('editorial_page', uid.value, { lang: Trans.getPrismicLocale() });
    if (!document) {
      await router.push('/404');
    }

    prismicData.title = document.data.title;
    prismicData.last_update = document.data.last_update;
    prismicData.image_header = document.data.image_header;
    prismicData.content = document.data.content;
    prismicData.seo_title = document.data.seo_title;
    prismicData.seo_description = document.data.seo_description;
    store.commit('message/setLoading', false);
  } catch (error) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': error.message,
      'httpCode': error.code
    }, { root: true })
  }
};

const isLoading = computed(() => store.state.message.loading);
const titlePage = computed(() => asText(prismicData.title) );
const contentPage = computed(() => asHTML(prismicData.content))
const updatedPage = computed(() => asDate(prismicData.last_update))
const { seoTitle, seoDesc } = computed(() => {
  return {
    'seoTitle': asText(prismicData.seo_title),
    'seoDesc': asText(prismicData.seo_description)
  }
})
</script>
