import { reqAddressInfo, reqOrderInfo } from '@/api'
const state = {
    //地址信息
    addressInfo: [],
    //订单信息
    orderInfo: {}
};
const mutations = {
    GETADDRESSINFO(state, addressInfo) {
        state.addressInfo = addressInfo;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
const actions = {
    //获取用户地址信息
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit('GETADDRESSINFO', result.data);
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户订单交易信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit('GETORDERINFO', result.data);
        } else {
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};