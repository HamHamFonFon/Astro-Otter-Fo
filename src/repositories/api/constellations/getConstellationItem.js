export const GET_CONSTELLATION_ITEM = async (id) => {
    if (!id) {
        throw new Error('Please provide a constellation identifier');
    }

    try {
        console.log(id);
    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
}