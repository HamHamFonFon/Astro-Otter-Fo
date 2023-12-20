import i18n from "@/i18n/i18n"
import { nextTick } from "vue"
import listLocales from "@/configs/avalaibleLocales"

const Trans = {
  get defaultLocale() {
    return 'en';
  },

  get currentLocale() {
    return i18n.global.locale.value
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },

  get supportedLocales() {
    return listLocales;
  },

  async switchLanguage (newLocale) {
    await Trans.loadLocaleMessages(newLocale)
    Trans.currentLocale = newLocale
    document.querySelector("html").setAttribute("lang", newLocale)
    // localStorage.setItem("user-locale", newLocale)
  },

  async loadLocaleMessages(locale) {
    if(!i18n.global.availableLocales.includes(locale)) {
      const messages = await import(`@/i18n/locales/${locale}.json`)
      i18n.global.setLocaleMessage(locale, messages.default)
    }

    return nextTick()
  },

  getLanguage () {
    return Trans.supportedLocales.filter(l => {
      return l.code === Trans.currentLocale
    })[0].lang;
  },

  getPrismicLocale () {
    return Trans.supportedLocales.filter(l => {
      return l.code === Trans.currentLocale
    })[0].codeL;
  },
}

export default Trans;
