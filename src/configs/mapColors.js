const COLOR_CLUST_GAL = '#8B1A1A';
const COLOR_GAL_G = '#C62828';
const COLOR_GAL_S = '#D32F2F';
const COLOR_GAL_SO = '#E53935';
const COLOR_GAL_SD = '#F44336';
const COLOR_GAL_E = '#EF5350';
const COLOR_GAL_I = '#E57373';
// const COLOR_GALAXY = '#ff0000'; // Galaxies

const COLOR_OC = '#FF4626'; // Open cluster
const COLOR_GC = '#ff9900'; // Global Cluster

const COLOR_SFR = '#EEFF41'; // Star forming nebula
const COLOR_EN = '#64DD17'; // Emission nebula
const COLOR_RN = '#00E5FF'; // Reflection nebula
const COLOR_PN = '#00BFA5'; // Planetary nebula
const COLOR_BN = '#1E88E5'; //BRIGHT NEBULA
const COLOR_SNR = '#1838CC'; // Supernova remnant
const COLOR_DN = '#5E35B1';
const COLOR_POS = '#cccccc';
const DEFAULT = '#ffffff';

export const dsoColors = {
    // Galaxies
    gg: {shape: "circle", fill: COLOR_CLUST_GAL},
    g: {shape: "ellipse", fill: COLOR_GAL_G},  // generic
    s: {shape: "ellipse", fill: COLOR_GAL_S}, // spirale
    s0: {shape: "ellipse", fill: COLOR_GAL_SO}, // lenticulaire
    sd: {shape: "ellipse", fill: COLOR_GAL_SD}, // naine
    e: {shape: "ellipse", fill: COLOR_GAL_E}, // eliptique
    i: {shape: "ellipse", fill: COLOR_GAL_I}, // irreguliere
    // Cluster
    oc: {shape: "circle", fill: COLOR_OC, stroke: COLOR_OC, width: 1.5},
    gc: {shape: "circle", fill: COLOR_GC, stroke: COLOR_GC, width: 2},
    // Nebula
    en: {shape: "square", fill: COLOR_EN},
    rn: {shape: "square", fill: COLOR_RN},
    pn: {shape: "diamond", fill: COLOR_PN},
    snr: {shape: "diamond", fill: COLOR_SNR},
    sfr: {shape: "square", fill: COLOR_SFR, stroke: COLOR_SFR, width: 2},
    bn: {shape: "square", fill: COLOR_BN, stroke: COLOR_BN, width: 2}, // Generic bright nebula
    dn: {shape: "square", fill: COLOR_DN, stroke: COLOR_DN, width: 2},
    pos: {shape: "marker", fill: COLOR_POS, stroke: COLOR_POS, width: 1.5},
    sc: {shape: "marker", fill: DEFAULT, stroke: DEFAULT, width: 1.5},
    vn: {shape: "marker", fill: DEFAULT, stroke: DEFAULT, width: 1.5},
    bpn: {shape: "marker", fill: DEFAULT, stroke: DEFAULT, width: 1.5}
};
