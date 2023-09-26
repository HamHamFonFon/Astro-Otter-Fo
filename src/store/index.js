import { createStore, createLogger } from 'vuex'

import auth from '@/store/modules/Auth'
import message from "@/store/modules/Message";
import astrobinImages from "@/store/modules/astrobinImages"

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    // Global
    auth,
    message,
    // Astrobin
    astrobinImages
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
