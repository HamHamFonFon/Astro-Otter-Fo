<template>
  <TitlePage :title="title" />
  <v-toolbar height="30">
    <v-toolbar-title class="text-h6 align-center">
      This product uses the AstroBin API but is not endorsed or certified by AstroBin.
    </v-toolbar-title>
  </v-toolbar>

  <v-sheet
      elevation="0"
      class="landing-warpper"
      color="transparent"
  >
    <v-container class="text-left">
      <v-expansion-panels bg-color="secondary">
        <v-expansion-panel bg-color="secondary">
          <v-expansion-panel-title color="secondary">
            Browse and filter...
          </v-expansion-panel-title>
          <v-expansion-panel-text bg-color="secondary">
            <v-form
              validate-on="submit"
              @submit.prevent="submitForm"
            >
                <v-row align="center" justify="center">
                  <v-col cols="3">
                    <v-select
                        label="Filtering by..."
                        v-model="formData.type"
                        :items="items"
                        item-value="key"
                        item-title="value"
                        variant="outlined"
                        required
                        clearable
                    ></v-select>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                        type="search"
                        label="Search terms"
                        v-model="formData.term"
                        variant="outlined"
                        required
                        clearable
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-btn type="submit" color="secondary" class="ml-2" variant="elevated"> Search </v-btn>
                  </v-col>
                </v-row>
                <v-divider></v-divider>

            </v-form>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <transition name="fade">

        <div v-if="!isLoading">
          <v-container class="text-left">
            <v-sheet elevation="1" class="mx-auto landing-warpper" rounded color="transparent">
              <v-sheet class="pa-3" elevation="0" color="transparent">
                <v-container>
                  <h5 v-if="totalCount" class="text-h6 mt-5">Results: {{ totalCount }} images</h5>
                  <v-row align="center">
                    <ItemsLists :items-list="sortedImages" :columns="4">
                      <template v-slot="{ item, index }">
                        <AstrobinCard v-bind:key="index" :item="item" />
                      </template>
                    </ItemsLists>
                  </v-row>
                </v-container>
              </v-sheet>
            </v-sheet>

            <v-row align="center" justify="center">
              <v-btn
                  prepend-icon="mdi-plus"
                  variant="outlined"
                  primary
                  v-if="totalCount > countItems"
                  @click="moreItems"
              > <span>Show more</span> </v-btn>
            </v-row>
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

import ItemsLists from "@/components/Items/ItemsList.vue";
import AstrobinCard from "@/components/Items/AstrobinCard.vue";

// const offset = ref(20);
const title = ref('Browse Astrobin API');
const items = reactive([
  {key: 'title__icontains', value: 'Title contains...'},
  {key: 'user', value: 'Images from user...'},
  {key: 'description__icontains', value: 'Description contains...'},
  {key: 'subjects', value: 'Subjects'}
]);
const formData = reactive({
  type: '',
  term: ''
});

onBeforeMount(() => {
  store.commit('message/setLoading', false);
  store.commit('astrobinImages/setTotalCount', 0);
});

const submitForm = () => {
  store.dispatch('astrobinImages/fetchImages', { formData: formData,  offset: 0, limit: 20});
}

const moreItems = () => {
  store.dispatch('astrobinImages/fetchImages', { formData: formData, offset: offset+20, limit: 20});
}

const {
  totalCount: totalCount,
  offset: offset
} = computed(() => store.state.astrobinImages);
const countItems = computed(() => store.state.astrobinImages.images.length);
const isLoading = computed(() => store.state.message.isLoading);

const sortedImages = computed(() => store.getters["astrobinImages/sortedImages"]);
</script>

<script>
export default {
  name: "BrowseImages"
}
</script>

<style scoped>

</style>