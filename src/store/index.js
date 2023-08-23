import { createStore, createLogger } from 'vuex';

import constellations from "@/store/modules/Constellations";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        constellations
    },
    strict: debug,
    plugins: debug ? [createLogger()]: []
});