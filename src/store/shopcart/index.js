import { reqCartlist, reqDeleteCart, reqCheckCart } from "@/api";
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    //获取购物车数据
    async getCartList({ commit }) {
        let result = await reqCartlist();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCart({ commit }, skuid) {
        let result = await reqDeleteCart(skuid);
        if (result.code == 200) {
            return 'OK';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //切换购物车产品选中的状态
    async checkCart({ commit }, { skuid, isChecked }) {
        let result = await reqCheckCart(skuid, isChecked);
        if (result.code == 200) {
            return 'OK';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //删除购物车中全选的产品
    deleteAllCheck({ dispatch, getters }) {
        //context:小仓库
        //获取购物车中的全部产品
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCart', item.skuId) : '';
            //将每一次返回的Promise添加到数组中
            promiseAll.push(promise);
        });
        //只要遍历的产品全部删除成功，返回结果即为成功
        return Promise.all(promiseAll);
    },
    //全选修改状态
    updateAllCheck({ dispatch, state }, isChecked) {
        
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('checkCart', { skuid: item.skuId, isChecked:isChecked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
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