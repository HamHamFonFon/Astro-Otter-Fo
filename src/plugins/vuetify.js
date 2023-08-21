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
        secondary: '#e9e9e9',

        appBarColor: '#1B2A32',
        textGrey: '#e9e9e9'
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
    }
});