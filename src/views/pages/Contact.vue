<template>
  <v-sheet
      elevation="0"
      class="landing-warpper"
      color="transparent"
  >
    <TitlePage :title="t('contact.title')" />

    <v-container class="text-left" >
      <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="background">
        <v-sheet class="pa-3" elevation="0" color="transparent">
          <v-container>
            <Message v-if="isLoading" />
            <div v-if="!isLoading">
              <v-card elevation="0" class="mx-auto my-10" color="transparent">
                <div class="text-left">{{ $t('contact.header')}}</div>
              </v-card>
              <ContactForm @submit-form="handleContactFormSubmission" />
            </div>

          </v-container>
        </v-sheet>
      </v-sheet>
    </v-container>


  </v-sheet>
</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, ref} from "vue";
import store from "@/store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
import Message from "@/components/Layout/Message.vue";
import { messageWs } from '@/repositories/api/contact';

const submittedFormData = ref(null);

const TitlePage = defineAsyncComponent(() => import('@/components/Content/TitlePage.vue'));
const ContactForm = defineAsyncComponent(() => import('@/components/Forms/ContactForm.vue'));

onBeforeMount(() => {
  store.commit('message/setLoading', false);
});

const handleContactFormSubmission = (submitFormData) => {
  store.commit('message/setMessage', {
    'loading': true,
    'type': 'warning',
    'message': t('contact.send_message'),
    'httpCode': null
  }, { root: true });
  submittedFormData.value = submitFormData;

  setTimeout(async () => {
    try {
      await messageWs.POST_MESSAGE(submittedFormData.value);
      store.commit('message/setMessage', {
        'loading': true,
        'type': 'success',
        'message': t('contact.received_message'),
        'httpCode': null
      }, {root: true});
    } catch (err) {
      store.commit('message/setMessage', {
        'loading': false,
        'type': 'error',
        'message': err.message,
        'httpCode': null
      }, {root: true});
    }

  }, 1000);
}

const isLoading = computed(() => store.state.message.loading);
</script>

<style scoped>

</style>
