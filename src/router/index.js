//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from '@/pages/Home/myIndex.vue';
import Login from '@/pages/Login/myIndex.vue';
import Register from '@/pages/Register/myIndex.vue';
import Search from '@/pages/Search/myIndex.vue';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
//配置路由
export default new VueRouter({
    //配置路由
    routes: [
        {
            path: "/detail/:skuid",
            component: Detail,
            meta: {
                showFooter: true
            }
        },
        {
            path: "/addcartsuccess",
            component: AddCartSuccess,
            name: "addcartsuccess",
            meta: {
                showFooter: true
            }
        },
        {
            path: "/shopcart",
            component: ShopCart,
            meta: {
                showFooter: true
            }
        },
        {
            path: "/home",
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            path: "/login",
            component: Login,
            meta: {
                showFooter: false
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                showFooter: false
            }
        },
        {
            path: "/search/:keyword",
            component: Search,
            meta: {
                showFooter: true
            },
            name: "search"
        },
        //重定向
        {
            path: "*",
            redirect: "/home"
        }
    ],
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //y=0代表滚动条在最上方
        return { y: 0 }
    }
})
