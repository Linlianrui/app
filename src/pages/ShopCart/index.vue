<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th7">版本</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('reduce', -1, cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
              @click="handler('change', $event.target.value * 1, cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="updateAllCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheck">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
//节流
import throttle from "lodash/throttle";
export default {
  name: 'ShopCart',
  mounted() {
    this.getData();
  },
  methods: {
    //获取购物车个人数据
    getData() {
      this.$store.dispatch('getCartList');
    },
    //修改某一个产品的个数(节流)
    handler: throttle(async function (type, disNum, cart) {
      //type:区别点击的是哪个
      //disNum:变化量
      //cart:区别点击的产品
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "reduce":
          if (cart.skuNum > 1) {
            disNum = -1;
          } else {
            disNum = 0;
          }
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      //派发action
      try {
        await this.$store.dispatch("addOrUpdateShopCart", { skuid: cart.skuId, skuNum: disNum });
        this.getData();
      } catch (error) {
        alert(error.message)
      }
    }, 1000),
    //删除购物车中某一个产品
    async deleteCart(cart) {
      try {
        await this.$store.dispatch('deleteCart', cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //切换购物车产品选中的状态
    async updateChecked(cart, event) {
      try {
        //获取的event.target.isChecked是布尔值，带给服务器的数据要转换成0/1
        let isChecked = event.target.checked ? "1" : "0";
        //派发action
        await this.$store.dispatch('checkCart', { skuid: cart.skuId, isChecked: isChecked });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除全选的产品
    async deleteAllCheck() {
      try {
        await this.$store.dispatch('deleteAllCheck');
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //点击全选修改状态
    async updateAllCheck(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch('updateAllCheck', { isChecked: isChecked });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    //计算出来的购物车的数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //计算购物车中商品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    //判断全选是否勾选
    isAllCheck() {
      return this.cartInfoList.every(item => item.isChecked == 1);
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 20%;
      }

      .cart-th7 {
        width: 15%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;

        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>