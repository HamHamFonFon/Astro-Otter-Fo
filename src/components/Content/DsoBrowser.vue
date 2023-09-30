<template>
  <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="transparent">
    <v-sheet class="pa-3" elevation="0" color="transparent">
      <v-container>

        <!--  Filters-->
        <v-row>
          <v-col cols="12" sm="4" v-for="(array, key) in filtersBy" v-bind:key="key">
            <v-select
                v-model="selectedFilters[key]"
                :label="key"
                variant="outlined"
                :items="array"
                item-title="label"
                item-value="name"
                @update:modelValue="fetchDsoList"
                clearable
            >
            </v-select>
          </v-col>
        </v-row>

        <!-- Sorts -->
        <v-row>
          <v-col cols="12" sm="12">
            <span class="text-white">{{ nbItems }} items on {{ totalRef }}</span>
          </v-col>
        </v-row>

        <!-- Items list + cards -->
        <v-row align="center">
          <ItemsLists :items-list="items" :columns="4">
            <template v-slot="{ item, index }">
              <DsoCard v-bind:key="index" :dso="item" />
            </template>
          </ItemsLists>
        </v-row>

        <!-- Btn More -->
        <v-row align="center" justify="center">
          <BtnMoreItems
              v-if="nbItems < totalRef"
              @click-event="showMoreItems"
              :label="btnLabel"
              :icon="btnIcon"
              :btnLoading="btnLoading"
          ></BtnMoreItems>
        </v-row>

      </v-container>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import {computed, defineAsyncComponent, onMounted, reactive, ref, toRefs} from "vue";
import {useStore} from "vuex";
import {DsoWs} from "@/repositories/api/dso";

const store = useStore();

// Components
const ItemsLists = defineAsyncComponent(() => import('@/components/Items/ItemsList.vue'));
const DsoCard = defineAsyncComponent(() => import('@/components/Items/DsoCard.vue'))
const BtnMoreItems = defineAsyncComponent(() => import('@/components/Content/btnMoreItems.vue'));

// Data
const items = ref([]);
const offset = ref(0);
const limit = ref(20);
const totalRef = ref(0);

const selectedFilters = reactive({});
const filtersRef = ref([]);

const btnLabel = ref('Show more')
const btnIcon = ref('mdi-plus');
const btnLoading = ref(false);

// Props
const props = defineProps({
  defaultFilterName: {
    type: String,
    default: null
  },
  defaultFilterValue: {
    type: String,
    default: null
  }
});
const { defaultFilterName, defaultFilterValue} = toRefs(props);

// On mount
onMounted(() => {
  fetchDsoList();
})

// Methods
const fetchDsoList = async () => {
  try {
    const defaultFilters = {[defaultFilterName.value]: defaultFilterValue.value}
    let params = {
      ...defaultFilters,
      ...selectedFilters
    };
    const { data, filters, total} = await DsoWs.GET_DSO_LIST(params, 0, limit.value);

    items.value = data;
    filtersRef.value = filters;
    totalRef.value = total;
    offset.value = 20;
  } catch (error) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': error.message,
      'httpCode': error.code
    }, { root: true })
  }
  store.commit('message/setLoading', false);
};

const showMoreItems = async  () => {
  btnLabel.value = 'Load data...';
  btnLoading.value = true;
  try {
    const defaultFilters = {};
    let params = {
      defaultFilters,
      ...selectedFilters
    };
    const { data, filters, total} = await DsoWs.GET_DSO_LIST(params, offset.value, limit.value);
    items.value = [...items.value, ...data]
    filtersRef.value = filters;
    totalRef.value = total;
    offset.value += 20;
    btnLabel.value = 'Show more';
  } catch (err) {
    store.commit('message/setMessage', {
      'loading': true,
      'type': 'error',
      'message': err.message,
      'httpCode': err.code
    }, { root: true })
  }
  btnLoading.value = false;
}

// Computed
const nbItems = computed(() => items.value.length);
const filtersBy = computed(() => {
  return Object.keys(filtersRef.value)
      .filter((type) => type !== defaultFilterName.value)
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: filtersRef.value[key]
        });
      }, {})
});
</script>

<style scoped>

</style>