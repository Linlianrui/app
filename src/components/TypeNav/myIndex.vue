<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition>
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName }}</a>
                                </h3>
                                <!-- 二级、三级分类 -->
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
    name: "TypeNav",

    data() {
        return {
            //存储用户鼠标的在一级分类上的位置
            currentIndex: -1,
            show: true
        }
    },

    //组件挂载完毕，可以向服务器发请求
    mounted() {
        //通知vuex发请求，获取数据存储在仓库中
        //this.$store.dispatch("categoryList");
        if (this.$route.path != '/home') {
            this.show = false;
        }
    },

    methods: {
        //鼠标进入一级分类修改响应式数据currentIndex属性
        //函数的节流，用lodash中的_throttle方法
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        //鼠标离开一级分类
        leaveIndex() {
            this.currentIndex = -1;
            if (this.$route.path != '/home') {
                this.show = false;
            }
        },
        //三级联动实现跳转搜索页
        goSearch(event) {
            //最好的方法：事件委派+编程式导航
            /*
            存在一些问题，事件委派是把全部子节点的事件委派给父节点
            1.我要实现的是点击<a></a>才实现路由跳转（那么怎么确定点击的一定是a标签呢？）
            2.即使你能确定点击的是a标签，怎么区分是一级、二级还是三级分类的标签呢？
            */
            //1.在a标签中，我加入自定义属性data-categoryName,其余子节点是没有的
            let element = event.target;
            //获取当前触发这个事件的所有节点，需要带有自定义属性data-categoryName这样的节点
            //节点有一个dataset属性，可以获取节点的自定义属性和属性值
            let { categoryname, category1id, category2id, category3id } = element.dataset;
            //如果节点身上有categoryname属性一定是我要的a标签
            if (categoryname) {
                //整理路由跳转的参数
                let location = { name: 'search' };
                let query = { categoryName: categoryname };
                //一级、二级、三级分类的a标签，方法同上，添加自定义属性data-category?Id
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }
                //路由跳转时，如果有params参数，一起带过去
                if (this.$route.params) {
                    location.params = this.$route.params;
                    //整理完参数
                    location.query = query;
                    //进行路由跳转
                    this.$router.push(location);
                }
            }
        },
        enterShow() {
            this.show = true;
        },

    },
    computed: {
        ...mapState({
            categoryList: (state) => state.home.categoryList.slice(0, 15),
        }),
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }

        //过渡动画的样式
        //开始
        .sort-enter {
            height: 0px;
        }

        //结束
        .sort-enter-to {
            height: 461px;
        }

        //定义动画的时间、速率
        .sort-enter-active {
            transition: all 0.5s linear;
        }
    }
}</style>
