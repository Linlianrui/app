import {reqCategoryList,reqGetBannerList,reqGetFloorList} from '@/api';
import { result } from 'lodash';
const state = {
    categoryList:[],//三级联动的数据
    bannerList:[],//轮播图的数据
    floorList:[]
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },

    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
const actions = {
    //通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code==200){
            commit("GETBANNERLIST",result.data)
        }
    },

    async getFloorList({commit}){
        let result = await reqGetFloorList();
        if(result.code==200){
            commit("GETFLOORLIST",result.data)
        }
    }
};
const getters = {};

export default{
    state,
    mutations,
    actions,
    getters
};