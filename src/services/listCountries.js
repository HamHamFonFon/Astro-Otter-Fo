import countries from 'i18n-iso-countries';
import langs from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(langs);
const list = countries.getNames('en', { select: 'official' })
const listCountries = Object.keys(list).map(k => ({key: k.toUpperCase(), value: list[k]}));

export default listCountries;
