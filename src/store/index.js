import { createStore, createLogger } from 'vuex'

import auth from '@/store/modules/Auth'
import message from "@/store/modules/Message";
import constellations from "@/store/modules/Constellations";
import astrobinIOTD from "@/store/modules/AstrobinIOTD";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    // Global
    auth,
    message,
    // Data
    constellations,
    // Astrobin
    astrobinIOTD
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
