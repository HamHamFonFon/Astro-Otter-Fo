import { searchWS } from '@/repositories/api/search';

const REGEX = new RegExp('/^[a-zA-Z0-9&\\-_;: ]+$/gm');

export const searchItems = async (terms) => {
    if (terms !== null && 2 <= terms.length) {
        console.log('Test regex', REGEX.test(terms))
        // if (!REGEX.test(terms)) {
        //     console.log('Regex do not match')
        //     return null;
        // }
        let { dsos, constellations } = await searchWS.GET_SEARCH_ITEMS(terms);

        let dsosList = dsos.map(item => {
          let otherDesigs = (0 < Object.keys(item.otherDesigs)) ? ' ('+ Object.values(item.otherDesigs).join(', ')+')' : ''
          return {
            id: item.id,
            text: item.fullNameAlt + otherDesigs,
            type: item.typeLabel,
            cover: null
          }
        });

        let constellationsList = constellations.map(item => {
          return {
            id: item.id.toLowerCase(),
            text: item.alt,
            cover: item.cover
          }
        })

        return {
          'dsos': dsosList,
          'constellations': constellationsList,
          'nbItems': (dsosList.length + constellationsList.length)
        }
    }
};
