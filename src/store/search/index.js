import { reqGetSearchInfo } from "@/api";
const state = {
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions = {
    //当前这个函数在调用获取服务器数据时，至少传递一个参数（空对象）
    //params形参：当用户派发action时，第二个参数传递过来的，至少是一个空对象
    async getSearchList({commit},params={}){
        let result = await reqGetSearchInfo(params);
        if(result.code==200){
            commit("GETSEARCHLIST",result.data)
        }
    },
};

//计算属性，在项目中，为了简化数据而生。
const getters = {
    //当前形参state，是当前小仓库（search）中的state，并非大仓库中的state
    goodsList(state){
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    attrsList(state){
        return state.searchList.attrsList;
    }
};

export default{
    state,
    mutations,
    actions,
    getters
};