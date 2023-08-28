import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";

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
        values: {
            constellation: {
                component: () => require('@/assets/svg/constellation.svg').default,
            },
            myGalaxy: {
                component: require('@/assets/svg/galaxy-cluster.svg').default,
            },
            myNebula: {
                component: require('@/assets/svg/nebula.svg').default,
            },
            myPlanet: {
                component: require('@/assets/svg/planet.svg').default,
            }
        }
    }
});