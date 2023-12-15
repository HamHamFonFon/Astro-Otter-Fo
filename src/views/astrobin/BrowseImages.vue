<template>
  <TitlePage :title="title" />

  <v-toolbar height="30">
    <v-toolbar-title class="text-h6 align-center">
      {{ $t('astrobin.disclaimer')}}
    </v-toolbar-title>
  </v-toolbar>

  <v-sheet
      elevation="0"
      class="landing-warpper"
      color="transparent"
  >
    <v-container class="text-left">
      <AstrobinSearchForm
        :form-data="formData"
        @submit-form="handleFormSubmission"
      />

      <transition name="fade">
        <div v-if="!isLoading && 0 < sortedImages.length">
          <v-container class="text-left">
            <v-sheet elevation="1" class="mx-auto landing-warpper" rounded color="transparent">
              <v-sheet class="pa-3" elevation="0" color="transparent">
                <v-row align="left" justify="left">
                  <v-col cols="12" sm="4">
                    <h5 v-if="totalCount" class="text-h6 mt-5">Results: {{ totalCount }} images</h5>
                  </v-col>
                  <v-col cols="12" sm="4" align="right">
                    <v-select
                        label="Sort results by…"
                        variant="outlined"
                        required
                        clearable
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <ItemsLists :items-list="sortedImages" :columns="4">
                    <template v-slot="{ item, index }">
                      <AstrobinCard v-bind:key="index" :item="item" />
                    </template>
                  </ItemsLists>
                </v-row>

                <v-row align="center" justify="center">
                  <v-btn
                      prepend-icon="mdi-plus"
                      size="x-large"
                      variant="outlined"
                      class="text-white mr-5"
                      color="grey"
                      v-if="totalCount > countItems"
                      @click="moreItems"
                  > <span>{{ $t('layout.btnMore')}}</span> </v-btn>
                </v-row>
              </v-sheet>
            </v-sheet>
          </v-container>
        </div>
      </transition>

      <transition name="fade">
        <Message />
      </transition>

    </v-container>
  </v-sheet>
</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, reactive, ref} from "vue";
import {useStore} from "vuex";
const store = useStore();

const TitlePage = defineAsyncComponent(() => import('@/components/Content/TitlePage.vue'));
const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const AstrobinSearchForm = defineAsyncComponent(() => import("@/components/Forms/AstrobinSearchForm.vue"))
import ItemsLists from "@/components/Items/ItemsList.vue";
import AstrobinCard from "@/components/Items/AstrobinCard.vue";
import {ImagesWs} from "@/repositories/astrobin/images";

const title = ref('Browse Astrobin API');
// Pre submit
const limit = ref(5);
const offset = ref(20);
const formData = ref({
  type: null,
  term: null
});

// Post submit
const totalCount = ref(0);
const itemsRef = reactive([]);

onBeforeMount(() => {
  store.commit('message/setLoading', false);
});

const handleFormSubmission = () => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': 'Load images from Astrobin API',
    'httpCode': null
  }, { root: true });

  try {
    itemsRef.value = [];
    let params = {};
    params[formData.value.type] = formData.value.term;

    console.log(
        params
    );
    fetchImages(params, offset, limit);
    // store.commit('message/setLoading', false, { root: true });
  } catch (err) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': err.message,
      'httpCode': err.code
    }, { root: true });
  }
}

const moreItems = () => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': 'Load new more images from Astrobin API',
    'httpCode': null
  }, {root: true});

  try {
    offset.value += 20;
    let params = {};
    params[formData.value.type] = formData.value.term;

    fetchImages(params, offset, limit);
  } catch (err) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': err.message,
      'httpCode': err.code
    }, {root: true});
  }
}

const fetchImages = async(params, offset, limit) => {
  const wsResponse = await ImagesWs.GET_IMAGES_BY(params, offset.value, limit.value);
  totalCount.value = wsResponse.totalCount;
  wsResponse.listImages.forEach(r => {
    itemsRef.push({
      id: r.astrobin_id,
      image: r.urlRegular,
      lazyImage: r.urlGallery,
      date: r.date,
      title: r.title,
      user: r.user,
      views: r.views,
      likes: r.likes
    });
  });
  store.commit('message/setLoading', false, {root: true});
}

const isLoading = computed(() => store.state.message.loading);
const countItems = computed(() => itemsRef.length);
const sortedImages = computed(() => itemsRef);
</script>

<style scoped>

</style>
