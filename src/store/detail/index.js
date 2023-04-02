import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodsInfo: {},
    //游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    }
};
const actions = {
    //获取产品信息
    async getGoodsInfo({ commit }, skuid) {
        let result = await reqGoodsInfo(skuid);
        if (result.code == 200) {
            commit("GETGOODSINFO", result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, {skuid, skuNum}) {
        //加入购物车返回的解构
        //加入购物车以后（发请求），前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他数据，只是返回code=200，代表这次操作成功
        //因为服务器没有返回其余的数据，不需要三连环存储数据到仓库
        let result = await reqAddOrUpdateShopCart(skuid, skuNum);
        if (result.code == 200) {
            return 'OK';
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || [];
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};