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
//删除购物车产品
export const reqDeleteCart = (skuid) => requests({url:`/cart/deleteCart/${skuid}`,method:'delete'});
//切换商品选中状态
export const reqCheckCart = (skuid,isChecked) => requests({url:`/cart/checkCart/${skuid}/${isChecked}`,method:'get'})
//获取验证码
export const reqGetCode = (phone)=> requests({url:`/user/passport/sendCode/${phone}`,method:'get'});
//用户完成注册
export const reqUserRegister = (data) => requests({url:'user/passport/register',data:data,method:'post'});
//用户登录
export const reqUserLogin = (data) => requests({url:'/user/passport/login',method:'post',data:data});
//获取用户信息（需要带着用户的token向服务器要用户信息）
export const reqUserInfo = () => requests({url:'user/passport/auth/getUserInfo',method:'get'});
//用户退出登录
export const reqLogout = () => requests({url:'user/passport/logout',method:'get'});
//获取用户地址信息
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});
//获取用户订单交易信息
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'});
//提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({url:`order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});
//获取订单支付信息
export const reqPayInfo = (orderId) => requests({url:`payment/weixin/createNative/${orderId}`,method:'get'});
//获取支付订单状态
export const reqPayStatus = (orderId) => requests({url:`payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取我的订单列表
export const reqMyOrderList = (page,limit) => requests({url:`order/auth/${page}/${limit}`,method:'get'});