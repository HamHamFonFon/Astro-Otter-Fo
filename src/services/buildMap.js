import { color } from "@/configs/mapColors";
// import celestial from "d3-celestial";

export const buildMap = (
    zoom,
    centerMap,
    constellationLine,
    itemsPoints,
    dataStars,
    dataMw
) => {
    console.log(dataMw);
    // let Celestial = celestial.Celestial();

    let mwConfig = {
        mw: {
            show: false,
            style: {fill: "#ffffff", opacity: 0.15}
        }
    };

    let starsConfig = {
        stars: {
            show: false,
            colors: true,
            names: true,
            proper: true,
            style: {fill: "#ffffff", opacity: 1},
            namelimit: 2,
            limit: 8,
            size: 5,
            data: dataStars
        }
    };

    let linesStyles = {
        line: {
            graticule: {
                show: true, stroke: "#cccccc", width: 0.6, opacity: 0.8,
                // grid values: "outline", "center", or [lat,...] specific position
                lon: {pos: [""], fill: "#eee", font: "10px Helvetica, Arial, sans-serif"},
                // grid values: "outline", "center", or [lon,...] specific position
                lat: {pos: [""], fill: "#eee", font: "10px Helvetica, Arial, sans-serif"}
            },
            equatorial: {show: false, stroke: "#aaaaaa", width: 1.3, opacity: 0.7},
        }
    }

    let backgroundConfig = {
        background: {
            fill: "#0B182B",   // Area fill
            opacity: 1,
            stroke: "#2B2A34", // Outline
            width: 1.5
        }
    };

    let horizonConfig = {
        horizon: {
            show: false,
            stroke: "#000099", // Line
            width: 1.0,
            fill: "#000000",   // Area below horizon
            opacity: 0.5
        }
    };

    let constellationsConfig = {
        constellations: {
            show: true,    // Show constellations
            names: true,   // Show constellation names
            desig: true,   // Show short constellation names (3 letter designations)
            namestyle: {
                fill: "#cccc99", align: "center", baseline: "middle",
                font: ["14px Helvetica, Arial, sans-serif",  // Style for constellations
                    "12px Helvetica, Arial, sans-serif",  // Different fonts for diff.
                    "11px Helvetica, Arial, sans-serif"]
            },// ranked constellations
            lines: true,   // Show constellation lines, style below
            linestyle: {stroke: "#cccccc", width: 1, opacity: 0.6},
            bounds: true, // Show constellation boundaries, style below
            boundstyle: {stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4]}
        }
    }

    let dsosConfig = {
        dsos: {
            show: true,
            data: null,
            names: true,
            limit: 1000,
            namelimit: 1000,
            symbols: {  //DSO symbol styles, 'stroke'-parameter present = outline
                // Galaxies
                gg: {shape: "circle", fill: color.gc}, // Galaxy cluster
                g: {shape: "ellipse", fill: color.g},  // Generic galaxy
                s: {shape: "ellipse", fill: color.s},  // Spiral galaxy
                s0: {shape: "ellipse", fill: color.s0}, // Lenticular galaxy
                sd: {shape: "ellipse", fill: color.sd},  // Dwarf galaxy
                e: {shape: "ellipse", fill: color.e}, // Elliptical galaxy
                i: {shape: "ellipse", fill: color.i}, // Irregular galaxy
                // Cluster
                oc: {shape: "circle", fill: color.oc, stroke: color.oc, width: 1.5},
                gc: {shape: "circle", fill: color.gc, stroke: color.gc, width: 2},
                // Nebula
                en: {shape: "square", fill: color.en},
                rn: {shape: "square", fill: color.rn},
                pn: {shape: "diamond", fill: color.pn},
                snr: {shape: "diamond", fill: color.snr},
                sfr: {shape: "square", fill: color.sfr, stroke: color.sfr, width: 2},

                bn: {shape: "square", fill: color.bn, stroke: color.bn, width: 2}, // Generic bright nebula
                dn: {shape: "square", fill: color.dn, stroke: color.dn, width: 2},               // Dark nebula grey
                // TODO : bipolar nebula
                // Other
                pos: {shape: "marker", fill: "#cccccc", stroke: "#cccccc", width: 1.5}              // Generic marker
            }
        }
    };

    let config = {
        width: 0,
        projection: "aitoff",
        transform: "equatorial",
        controls: false,

        geopos: centerMap,
        adaptable: true,
        interactive: true,
        form: false,
        location: false,

        container: "celestial-map",
        zoomlevel: zoom,
        ...mwConfig,
        ...starsConfig,
        ...constellationsConfig,
        ...dsosConfig,
        ...linesStyles,
        ...backgroundConfig,
        ...horizonConfig
    };
    //
    // Celestial.display(config);
    // Celestial.apply({ mw: { show: false } });
};