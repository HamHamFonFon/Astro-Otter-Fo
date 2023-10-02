export const saveShareLink = (routePath, params) => {
    Object.entries(params).forEach(([key, val])  =>
        (val && typeof val === 'object') && removeEmpty(val) ||
        (val === null || val === "") && delete params[key]
    );

    let url = routePath + '?' + Object.keys(params)
        .map(key => {
            return (
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key].toLowerCase())
            )
        })
        .join('&');


    history.pushState({}, null, url);
    return url;
}