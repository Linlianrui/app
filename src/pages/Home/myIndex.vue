<template>
    <div>
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"></Floor>
        <Trademark></Trademark>
    </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/myIndex.vue"
import Recommend from "@/pages/Home/Recommend/myIndex.vue"
import Rank from "@/pages/Home/Rank/myIndex.vue"
import Like from "@/pages/Home/Like/myIndex.vue"
import Floor from "@/pages/Home/Floor/myIndex.vue"
import Trademark from "@/pages/Home/Trademark/myIndex"

import { mapState } from 'vuex';


export default {
    name: 'home',
    components:{
        ListContainer,Recommend,Rank,Like,Floor,Trademark
    },
    data() {
        return {
            
        };
    },

    mounted() {
        //派发action
        this.$store.dispatch("getFloorList");
        //获取用户信息在首页展示
        //this.$store.dispatch('getUserInfo');
    },

    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>