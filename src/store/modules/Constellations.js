const initialState = () => {
    return {
        constellations: [],
        totalCount: 0,
        offset: 0,
        filterCriteria: null
    }
};

const state = initialState();

const actions = {
    async fetchConstellations({ commit }) {
        commit('resetState');
    },
    async fetConstellationById({ commit }, id) {
        commit('resetState');
    }
};

const mutations = {
    resetState: (state) => {
        const s = initialState();
        Object.keys(s).forEach(key => {
            state[key] = s[key];
        })
    },
    setTotalCount: (state, totalCount) => {
        state.totalCount = totalCount;
    },
    setOffset: (state, offset) => {
        state.offset = offset;
    },
    addConstellation: (state, constellation) => {
        state.constellations.push(constellation);
    }
};

const getters = {
    getConstellationById: (state) => (id) => {
        return state.constellations.find(constellation => id === constellation.id);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};