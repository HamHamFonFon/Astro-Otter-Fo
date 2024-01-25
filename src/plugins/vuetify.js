import 'vuetify/dist/vuetify.min.css';
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { useI18n } from 'vue-i18n'
import i18n from "@/i18n/i18n";
// import ConstellationIcon from "@/icons/ConstellationIcon.vue";

const AstroOtterLightThemes = {
  dark: false,
  colors: {
    background: "#111b27",
    // surface: "#1E293B",
    primary: '#1B2A32', //'#273E4B',
    secondary: '#253A46',

    appBarColor: '#1B2A32',
    grey: '#a7b6bf', //'#e9e9e9',
    green: '#1ed760'
  },
  theme: {
    grey: '#ff0000' //'#e9e9e9',
  }
};

export default createVuetify({
  components: {
    ...components,
    ...labs,
  },
  directives,
  theme: {
    themes: {
      light: AstroOtterLightThemes
    }
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi
    },
    constellation: {
      component: () => import('@/components/icons/CustomIcon.vue'),
      props: {
        iconName: "constellation"
      }
    },
    dso: {
      component: () => import('@/components/icons/CustomIcon.vue'),
      props: {
        iconName: "dso"
      }
    },
    planet: {
      component: () => import('@/components/icons/CustomIcon.vue'),
      props: {
        iconName: "planet"
      }
    },
    telescope: {
      component: () => import('@/components/icons/CustomIcon.vue'),
      props: {
        iconName: "telescope"
      }
    },
    nebula: {
      component: () => import('@/components/icons/CustomIcon.vue'),
      props: {
        iconName: "nebula"
      }
    }
  },
  defaults :{
    VRadioGroup: {
      color: '#1ed760',
    }
  },
  locale: {
    adapter: createVueI18nAdapter({i18n , useI18n})
  },
  options: {
    customProperties: true
  }
});
