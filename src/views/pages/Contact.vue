<template>
  <v-sheet
      elevation="0"
      class="landing-warpper"
      color="transparent"
  >
    <TitlePage :title="titre" />

    <v-container class="text-left" >
      <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="background">
        <v-sheet class="pa-3" elevation="0" color="transparent">
          <v-container>
            <transition v-if="!isLoading"  name="fade">
              <div>
                <v-card elevation="0" class="mx-auto my-10" color="transparent">
                  <div class="text-left">Leave your message and we'll get back to you shortly. </div>
                </v-card>
                <ContactForm @submit-form="handleContactFormSubmission" />
              </div>
            </transition>

            <transition name="fade">
              <Message />
            </transition>
          </v-container>
        </v-sheet>
      </v-sheet>
    </v-container>


  </v-sheet>
</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, ref} from "vue";
import store from "@/store";
import Message from "@/components/Layout/Message.vue";
import { messageWs } from '@/repositories/api/contact';


const titre = ref('Contact');
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
    'message': 'Sending message in progress',
    'httpCode': null
  }, { root: true });
  submittedFormData.value = submitFormData;

  setTimeout(async () => {
    try {
      await messageWs.POST_MESSAGE(submittedFormData.value);
      store.commit('message/setMessage', {
        'loading': true,
        'type': 'success',
        'message': 'Your message has been received. We will answer you as soon as possible.',
        'httpCode': null
      }, {root: true});
    } catch (err) {
      store.commit('message/setMessage', {
        'loading': true,
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