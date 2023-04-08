import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo,reqLogout } from "@/api";
import {setToken,getToken,removeToken} from "@/utils/token";

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    USERLOGOUT(state){
        //清空仓库存储的数据
        state.token='';
        state.userInfo={},
        //清空本地存储的数据
        removeToken();
    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'OK';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //用户注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data);
        if (result.code == 200) {
            return 'OK';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        //服务器下发token,用户唯一标识符
        if (result.code == 200) {
            //用户登录成功并且获取到token
            commit('USERLOGIN', result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'OK';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户信息（需要带着用户的token向服务器要用户信息）
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            //提交用户信息
            commit('GETUSERINFO', result.data);
            return 'OK';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //用户退出登录
    async userLogout({commit}){
        let result = await reqLogout();
        if (result.code == 200) {
            commit('USERLOGOUT');
            return 'OK';
        }else{
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