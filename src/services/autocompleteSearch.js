import { searchWS } from '@/repositories/api/search';

const REGEX = new RegExp('/^[a-zA-Z0-9&\\-_;: ]+$/gm');

export const searchItems = async (terms) => {
    if (terms !== null && 2 <= terms.length) {
        console.log('Test regex', REGEX.test(terms))
        // if (!REGEX.test(terms)) {
        //     console.log('Regex do not match')
        //     return null;
        // }
        let data = await searchWS.GET_SEARCH_ITEMS(terms);
        return data.map(item => {
            return {
                id: item.id,
                text: item.fullNameAlt + ' (' + Object.values(item.otherDesigs).join(', ') + ')',
                type: item.typeLabel,
                constellation: item.constellation
            }
        })
    }
};