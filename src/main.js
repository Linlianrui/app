import Vue from 'vue'
import App from './App.vue'
//三级联动组件——全局组件
import TypeNav from "@/components/TypeNav/myIndex.vue"
//轮播图——全局组件
import Carousel from "@/components/Carousel/myIndex.vue"
//分页器
import Pagination from "@/components/Pagination/myIndex.vue"
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入路由
import router from '@/router';
//引入仓库
import store from '@/store';
//引入假数据
import "@/mock/mockServe";
//引入swiper样式
import "swiper/css/swiper.css";

// import {reqGetSearchInfo} from '@/api';
// console.log(reqGetSearchInfo({}));

new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
  //注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
