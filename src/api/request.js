//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";
//引入仓库
import store from "@/store";
//利用axios对象中的方法create，创建一个axios实例
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    //代表请求超时的时间
    timeout:5000,
});

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里有一个属性很重要，header请求头
    if(store.state.detail.uuid_token){
        //请求头添加一个字段(userTempId):和后台商量好
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    nProgress.start();
    return config;
});

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nProgress.done();
    return res.data;
},(error)=>{
    //失败的回调函数
    return Promise.reject(new Error('faile'));
});

//对外暴露
export default requests;