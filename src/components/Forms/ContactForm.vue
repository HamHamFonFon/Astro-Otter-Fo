<template>
  <v-form @submit.prevent="submitContactForm" class="form">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Lastname"
          v-model="state.lastName"
          variant="outlined"
          :error="v$.lastName.$error"
          :error-messages="errors.lastName"
          color="white"
          clearable
          required
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Firstname"
          v-model="state.firstName"
          variant="outlined"
          :error="v$.firstName.$error"
          :error-messages="errors.firstName"
          clearable
          required
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          type="email"
          v-model="state.mailAdress"
          label="email"
          variant="outlined"
          :error="v$.mailAdress.$error"
          :error-messages="errors.mailAdress"
          clearable
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          type="email"
          v-model="state.confirmEmail"
          label="Confirm email"
          variant="outlined"
          :error="v$.confirmEmail.$error"
          :error-messages="errors.confirmEmail"
          clearable
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-select
          clearable
          text-align="left"
          label="Select"
          :items="optionsTopic"
          item-title="value"
          item-value="key"
          variant="outlined"
          v-model="state.topic"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <v-textarea
          variant="outlined"
          v-model="state.message"
          label="Message"
          :error="v$.message.$error"
          :error-messages="errors.message"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" align-self="center">
        <v-btn
          type="submit"
          block
          color="succes"
          size="x-large"
          variant="outlined"
          class="text-white mr-5"
        > Submit </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import contactTopics from "@/configs/contactTopics";

const optionsTopic = ref(contactTopics);
const state = reactive({
  lastName: '',
  firstName: '',
  mailAdress: '',
  confirmEmail: '',
  topic: null,
  message: ''
});

const minRequiredLength = ref(2);
const validations = {
  lastName: {
    required,
    minLength: minLength(minRequiredLength.value)
  },
  firstName: {
    required,
    minLength: minLength(minRequiredLength.value)
  },
  mailAdress: {
    required,
    email
  },
  confirmEmail: {
    required,
    email,
    sameAsRef: sameAs(state.mailAdress)
  },
  message: {
    required
  }
};
const v$ = useVuelidate(validations, state, { $lazy: true });

const errors = computed(() =>  {
  console.log(v$.value.$errors);
  const errors = v$.value.$errors;
  return (0 < errors.length)
      ?
        errors.reduce((acc, value) => {
          return {...acc, [value.$property]: value.$message}
        })
      : []
})
const emit = defineEmits(['submit-form']);
const submitContactForm = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    return;
  }

  v$.value.$reset();
  emit('submit-form', {...state});
}
</script>

<style scoped>

</style>