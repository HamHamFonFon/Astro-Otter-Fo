/**
 *
 * @param constellation
 * @returns {{features: [{geometry: *, id: string, type: string, properties: {}}], type: string}}
 */
const geoJsonConstellation = (constellation) => {
    return {
        'type': 'FeatureCollection',
        'features': [
            {
                "type": "Feature",
                "geometry": constellation.geometryLine,
                "properties": {
                }
            }
        ]
    }
};

/**
 *
 * @param items
 * @returns {{features: *, type: string}}
 */
const geoJsonDso = (items) => {
    let features = items.map(item => {
        return {
            'type': 'feature',
            'id': item.id,
            'geometry': item.geometry,
            'properties': {
                'name': item.fullNameAlt,
                'type': item.type,
                'mag': item.magnitude
            }
        }
    });

    return {
        'type': 'FeatureCollection',
        'features': features
    }
};

export const geoJsonServices = {
    geoJsonConstellation,
    geoJsonDso
}