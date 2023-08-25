import { createStore, createLogger } from 'vuex'

import auth from '@/store/modules/Auth'
import message from "@/store/modules/Message";
import constellations from "@/store/modules/Constellations";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    auth,
    message,
    constellations
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
