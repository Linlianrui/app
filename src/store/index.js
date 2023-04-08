import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//引入小仓库
import home from './home';
import search from "./search";
import users from "./users";
import detail from "./detail";
import shopcart from "./shopcart";
import trade from "./trade";
import pay from "./pay";

export default new Vuex.Store({
    //实现Vuex仓库模块式开发存储数据
    modules:{
        home,search,users,detail,shopcart,trade,pay
    }
});