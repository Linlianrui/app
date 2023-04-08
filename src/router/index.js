//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
//引入仓库
import store from "@/store";
//引入路由组件
import Home from '@/pages/Home/myIndex.vue';
import Login from '@/pages/Login/index.vue';
import Register from '@/pages/Register/index.vue';
import Search from '@/pages/Search/myIndex.vue';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
//引入二级路由
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';


//配置路由
const router = new VueRouter({
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
            path: "/center",
            component: Center,
            meta: {
                showFooter: true
            },
            //二级路由
            children: [
                {
                    path: 'myorder',
                    component: MyOrder,

                },
                {
                    path: 'grouporder',
                    component: GroupOrder,
                },
                //重定向
                {
                    path: "/center",
                    redirect: "/center/myorder"
                }
            ]
        },
        {
            path: "/paysuccess",
            component: PaySuccess,
            meta: {
                showFooter: true
            },
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                if (from.path == "/pay") {
                    next();
                } else {
                    //从哪来回哪去
                    next(false);
                }
            },
        },
        {
            path: "/pay",
            component: Pay,
            meta: {
                showFooter: true
            },
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                if (from.path == "/trade") {
                    next();
                } else {
                    //从哪来回哪去
                    next(false);
                }
            },
        },
        {
            path: "/trade",
            component: Trade,
            meta: {
                showFooter: true
            },
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                if (from.path == "/shopcart") {
                    next();
                } else {
                    //从哪来回哪去
                    next(false);
                }
            },
        },
        {
            path: "/addcartsuccess",
            component: AddCartSuccess,
            name: "addcartsuccess",
            meta: {
                showFooter: true
            },
            
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

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //next();//放行
    let token = store.state.users.token;
    let name = store.state.users.userInfo.name;
    //如果用户登录了
    if (token) {
        //想去登录页
        if (to.path == "/login" || to.path == "/register") {
            next('/');
        } else {
            //去其他页面
            //如果有用户名
            if (name) {
                next();
            } else {
                //派发action获取用户信息
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效了,清除用户信息，重新登录
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        //未登录:不能与交易相关的进行操作
        // if(to.path=="/pay"||to.path=="/paysuccess"||to.path=="/center/myorder"||to.path=="/trade"){
        //     next('/login')
        // }else{
        //     next();
        // }
        if (to.path.indexOf('/pay') != -1 || to.path.indexOf('/trade') != -1 || to.path.indexOf('/center') != -1) {
            //携带query参数，告诉路由组件，登录后要跳转当前页而不是首页
            next("/login?redirect=" + to.path);
        } else {
            next();
        }
    }
})

export default router;
