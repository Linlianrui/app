<template>
    <div class="swiper-container" id="floor1Swiper" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name: 'Carousel',
    props:['list'],

    watch: {
        //监听list数据的变化(但数据是父组件给的一个对象，对象里该有的数据都是有的，这个数据从来没有变化)
        list: {
            immediate:true,//不管数据是否变化，立即监听一次
            handler(newValue, oldValue) {
                //只能监听到数据已经有了，但是v-for动态渲染结构没有办法确定，需要使用nextTick
                this.$nextTick(() => {
                    var mySwiper = new Swiper(
                        this.$refs.cur,
                        {
                            loop: true,
                            //如果需要分页器
                            pagination: {
                                el: ".swiper-pagination",
                                clickable: true,
                            },
                            //如果需要前进后退按钮
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                        })
                })
            }
        }
    },
    
};
</script>

<style lang="scss" scoped></style>