<template>
  <TitlePage title="Catalogs" />

  <v-divider></v-divider>

  <transition name="fade">
    <Message />
  </transition>

  <transition>
    <v-sheet
        elevation="0"
        class="landing-warpper"
        color="transparent"
    >
      <v-container class="text-left">

        <v-expansion-panels bg-color="secondary">
          <v-expansion-panel bg-color="secondary">
            <v-expansion-panel-title color="secondary">
              Filtering {{ count }} results
            </v-expansion-panel-title>
            <v-expansion-panel-text bg-color="secondary">
              Filter list items by constellation, type and magnitude...and discover most beautiful celestial objects.
              <v-divider></v-divider>
              <v-spacer></v-spacer>
              <v-card color="primary">
                <v-tabs
                    v-model="list_facets"
                    bg-color=""
                >
                  <v-tab value="facets_constellations">Constellations</v-tab>
                  <v-tab value="facets_catalogs">Catalogs</v-tab>
                  <v-tab value="facets_type_objects">Type objects</v-tab>
                  <v-tab value="facets_magnitude">Magnitude</v-tab>
                </v-tabs>

                <v-card-text>
                  <v-window v-model="list_facets">
                    <v-window-item value="facets_constellations">
                      <v-radio-group column>
                        <v-radio label="Andromeda" value="and"></v-radio>
                        <v-radio label="Aquila" value="aql"></v-radio>
                        <v-radio label="Orion" value="ori"></v-radio>
                      </v-radio-group>
                    </v-window-item>
                    <v-window-item value="facets_catalogs">
                      <v-radio-group column>
                        <v-radio label="Messier" value="messier"></v-radio>
                        <v-radio label="NGC" value="ngc"></v-radio>
                        <v-radio label="Sharpless" value="sh2"></v-radio>
                      </v-radio-group>
                    </v-window-item>
                    <v-window-item value="facets_type_objects">
                      <v-radio-group>
                        <v-radio label="Galaxy" value="gg"></v-radio>
                        <v-radio label="Nebula" value="pn"></v-radio>
                        <v-radio label="Cluster" value="cc"></v-radio>
                      </v-radio-group>
                    </v-window-item>
                    <v-window-item value="facets_magnitude">
                      <v-radio-group>
                        <v-radio label="< 5" value="1"></v-radio>
                        <v-radio label="Between 5 and 10" value="1"></v-radio>
                        <v-radio label="Between 10 and 15" value="1"></v-radio>
                        <v-radio label="More than 15" value="1"></v-radio>
                      </v-radio-group>
                    </v-window-item>
                  </v-window>
                </v-card-text>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-sheet elevation="0" class="mx-auto landing-warpper" rounded color="transparent">
          <v-sheet class="pa-3" elevation="0" color="transparent">
            <v-container color="transparent">
              <v-row align="center" color="transparent">
                <ItemsLists :items-list="dsoList" :columns="5" :gap="0">
                  <template v-slot="{ item, index }">
                    <DsoCard v-bind:key="index" :dso="item"></DsoCard>
                  </template>
                </ItemsLists>
              </v-row>
            </v-container>
          </v-sheet>
        </v-sheet>
      </v-container>
    </v-sheet>
  </transition>

</template>

<script>
import Message from "@/components/Layout/Message.vue"
import TitlePage from "@/components/Content/TitlePage.vue";
import ItemsLists from "@/components/Items/ItemsList.vue";
import DsoCard from "@/components/Items/DsoCard.vue";

export default {
  name: "CatalogsPage",
  components: {
    TitlePage,
    DsoCard,
    ItemsLists,
    Message
  },
  created() {
    this.$store.commit('message/setLoading', false);
  },
  data() {
    return {
      count: 9614,
      list_facets: null,
      dsoList : [
        {dsoId: 'm42', image: 'https://www.astrobin.com/cc5kpv/0/rawthumb/regular/', title: 'Orion nebula', type: '', constellation: 'Orion'},
        {dsoId: 'm31', image: 'https://www.astrobin.com/si8zi0/0/rawthumb/regular/', title: 'Andromeda galaxy', type: 'spiral galaxy', constellation: 'Andromeda'},
        {dsoId: 'ngc7293', image: 'https://www.astrobin.com/379758/0/rawthumb/regular/', title: 'Helix nebula', type: '', constellation: 'Aquila'},
      ]
    }
  }
}
</script>

<style scoped>

</style>