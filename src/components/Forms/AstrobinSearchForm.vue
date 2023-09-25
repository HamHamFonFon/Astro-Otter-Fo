<template>
  <form @submit.prevent="submitForm">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="3">

        <v-select
          label="Filtering by..."
          v-model="formData.type"
          :items="astrobinFiltersRef"
          item-value="key"
          item-title="value"
          variant="outlined"
          required
          clearable
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4">
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

      <v-col cols="12" sm="2">
        <v-btn type="submit" color="primary text-white" variant="elevated" size="x-large"> Search </v-btn>
      </v-col>

      <v-col cols="12" sm="3">
        <v-select
            label="Sort results by..."
            v-model="formData.sort"
            variant="outlined"
            required
            clearable
            disabled=""
        ></v-select>
      </v-col>
    </v-row>
  </form>
</template>

<script setup>

import {ref, toRefs} from "vue";
import astrobinFilters from '@/configs/astrobinFilters'
const astrobinFiltersRef = ref(astrobinFilters);

const props = defineProps({
  formData: {
    type: Object
  }
});
const formData = toRefs(props);
const emit = defineEmits(['submit-form']);
const submitForm = () => {
  emit('submit-form')
} ;
</script>

<style scoped>

</style>