<script setup>
import { useI18n } from 'vue-i18n'
import { useLocale } from "vuetify";

import CountryFlag from 'vue-country-flag-next'
import Tr from "@/services/translation"

const { t } = useI18n();
const { current } = useLocale();

const switchLanguage = async (newLocale) => {
  current.value = newLocale;
  await Tr.switchLanguage(newLocale)
}

</script>

<template>
  <v-menu class="float-right">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon color="text-grey">mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-list nav>
      <v-list-item
        v-for="locale in Tr.supportedLocales"
        :key="locale.code"
        density="compact"
        @click="switchLanguage(locale.code)"
        :active="locale.code === current"
      >
        <template v-slot:prepend>
          <country-flag :country="locale.flag" />
        </template>
        <v-list-item-title class="mt-2" style="padding: 0 0.5em;">{{ t(`languages.${locale.code}`) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>

</style>
