//API统一管理
import requests from "./request";
import mockRequests from "./mockRequest";

//三级联动接口
//发请求:axios发请求返回的结果是Promise对象
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'});
//获取banner
export const reqGetBannerList = () => mockRequests({url:'/banner',method:'get'});
//获取floor
export const reqGetFloorList = () => mockRequests({url:'/floor',method:'get'});
//获取搜索模块数据
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params});
//获取产品详情信息
export const reqGoodsInfo = (skuid) => requests({url:`/item/${skuid}`,method:'get'});
//将产品添加到购物车
export const reqAddOrUpdateShopCart = (skuid,skuNum) => requests({url:`/cart/addToCart/${skuid}/${skuNum}`,method:'post'});
//获取购物车列表数据
export const reqCartlist = () => requests({url:'/cart/cartList',method:'get'});