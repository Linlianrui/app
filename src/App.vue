<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Login、Register隐藏非路由组件Footer -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/myIndex.vue';
import Footer from './components/Footer/myIndex.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //派发一个action，获取三级联动数据
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
