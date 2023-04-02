import { reqCartlist } from "@/api";
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartlist();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};