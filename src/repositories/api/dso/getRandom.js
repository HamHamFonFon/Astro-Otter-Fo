export const GET_RANDOM = async () => {
    try {
        console.log('Get random dso...')
    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
};