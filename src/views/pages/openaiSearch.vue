<script setup>
import {defineAsyncComponent, onMounted, ref} from "vue";
import { useI18n } from 'vue-i18n'
import {useStore} from "vuex";

const TitlePage = defineAsyncComponent(() => import('@/components/Content/TitlePage.vue'));
const Message = defineAsyncComponent(() => import('@/components/Layout/Message.vue'));
const OpenAiForm = defineAsyncComponent(() => import('@/components/Forms/OpenAiForm.vue'));
const ItemsList = defineAsyncComponent(() => import('@/components/Items/ItemsList.vue'));

import {main} from "@/services/openai";

const store = useStore();
const { t } = useI18n();

const submittedFormData = ref(null);
const items = ref([]);
const columns = ref(3);

onMounted(() => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'info',
    'message': t('openai.disclaimer'),
    'httpCode': 200
  }, { root: true });
})

const handleOpenAiSearch = async (submitFormData) => {
  submittedFormData.value = submitFormData;
  try {
    const response = await main(submittedFormData.value);
    console.log(response)
  } catch (e) {
    console.log(e.message)
  }

}

</script>

<template>
  <TitlePage :title="t('openai.title')" />
  <Message />
  <v-sheet
    elevation="0"
    class="landing-warpper"
    color="transparent"
  >
    <v-container class="text-left">
     <OpenAiForm @submit-form="handleOpenAiSearch"></OpenAiForm>

      <ItemsList
        :items-list="items"
        :columns="columns"
      >
        <template v-slot="{ item, index }">
          {{ index }} - {{ item.title }}
        </template>
      </ItemsList>
    </v-container>
  </v-sheet>
</template>

<style scoped>

</style>
