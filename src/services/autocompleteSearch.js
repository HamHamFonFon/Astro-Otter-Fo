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
            let otherDesigs = (0 < Object.keys(item.otherDesigs)) ? ' ('+ Object.values(item.otherDesigs).join(', ')+')' : ''
            return {
                id: item.id,
                text: item.fullNameAlt + otherDesigs,
                type: item.typeLabel,
                constellation: item.constellation
            }
        })
    }
};