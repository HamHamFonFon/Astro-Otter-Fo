import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";

// import ConstellationIcon from "@/icons/ConstellationIcon.vue";

const AstroOtterLightThemes = {
    dark: false,
    colors: {
        background: "#111b27",
        // surface: "#1E293B",
        primary: '#1B2A32', //'#273E4B',
        secondary: '#253A46',

        appBarColor: '#1B2A32',
        grey: '#e9e9e9',
        green: '#1ed760'
    },
    theme: {
        grey: '#e9e9e9',
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
    defaults :{
        VRadioGroup: {
            color: '#1ed760',
        }
    },
    icons: {
        constellation: {
            component: () => import('@/icons/CustomIcon.vue'),
            props: {
                iconName: "constellation"
            }
        },
        planet: {
            component: () => import('@/icons/CustomIcon.vue'),
            props: {
                iconName: "planet"
            }
        },
        telescop: {
            component: () => import('@/icons/CustomIcon.vue'),
            props: {
                iconName: "telescop"
            }
        },
        nebula: {
            component: () => import('@/icons/CustomIcon.vue'),
            props: {
                iconName: "nebula"
            }
        },
    },
    options: {
        customProperties: true
    }
});