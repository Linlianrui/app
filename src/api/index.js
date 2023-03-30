//API统一管理
import requests from "./request";
import mockRequests from "./mockRequest";

//三级联动借口
//发请求:axios发请求返回的结果是Promise对象
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'});

export const reqGetBannerList = () => mockRequests({url:'/banner',method:'get'});

export const reqGetFloorList = () => mockRequests({url:'/floor',method:'get'});

export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params});

export const reqGoodsInfo = (skuid) => requests({url:`/item/${skuid}`,method:'get'});