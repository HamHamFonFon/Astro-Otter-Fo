<template>
  <v-alert
      v-if="isLoading"
      :type="computedType"
      border="start"
      variant="outlined"
      prominent
      closable
  >
    <img :src="imgLoading" v-if="'warning' === computedType" style="width: 32px;" :alt="computedType">
    <span>{{ computedMsg }}</span>
  </v-alert>
</template>

<script>
import { mapState } from "vuex";
import imgLoading from '@/assets/images/layout/loading.gif'

export default {
  name: "ErrorMessage",
  data () {
    return {
      imgLoading: imgLoading
    }
  },
  computed: {
    ...mapState({
      msgError: state => state.message.message,
      type: state => state.message.type,
      loading: state => state.message.loading
    }),
    computedMsg() {
      return this.msgError;
    },
    computedType() {
      return this.type
    },
    isLoading() {
      return this.loading
    }
  }
}
</script>

<style scoped>

</style>