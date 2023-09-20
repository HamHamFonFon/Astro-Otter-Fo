/**
 * Parse jwt
 *
 * @param token
 * @returns {any}
 */
export const jwtParser = (token) => {
    if (null === token) {
        return token;
    }
    let base64Url = token.split('.')[1];
    if (undefined === base64Url) {
        return null;
    }

    let base64 = base64Url.replace('-', '+').replace('_', '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}