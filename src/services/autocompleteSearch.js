import { searchWS } from '@/repositories/api/search';

const REGEX = new RegExp('/^[a-zA-Z0-9&\\-_;: ]+$/gm');

export const searchItems = async (terms) => {
  if (terms !== null && 2 <= terms.length) {
    console.log('Test regex', REGEX.test(terms))
    // if (!REGEX.test(terms)) {
    //     console.log('Regex do not match')
    //     return null;
    // }
    let items = await searchWS.GET_SEARCH_ITEMS(terms);

    let nbDso, nbConstellations = 0;
    let dsosList, constellationsList = null;

    if (undefined !== items) {
      dsosList = items.filter(item => 'App\\Model\\Dso' === item.context).map(item => {
        let otherDesigs = (0 < Object.keys(item.otherDesigs)) ? ' ('+ Object.values(item.otherDesigs).join(', ')+')' : ''
        return {
          id: item.id,
          urlName: item.urlName ?? null,
          text: item.fullNameAlt + otherDesigs,
          type: item.typeLabel,
          cover: null
        }
      });
      nbDso = dsosList.length;

      constellationsList = items.filter(item => 'App\\Model\\Constellation' === item.context).map(item => {
        return {
          id: item.id.toLowerCase(),
          urlName: item.urlName ?? null,
          text: item.alt,
          cover: item.cover
        }
      });
      nbConstellations = constellationsList.length
    }
    return {
      'dsos': dsosList,
      'constellations': constellationsList,
      'nbItems': nbDso + nbConstellations
    }
  }
};
