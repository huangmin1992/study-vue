<template>
  <div class="hello">
    <div class="car-title">
      <h4>购物车</h4>
    </div>
    <div class="car-nav">
      <ul>
        <li v-for='item in navList'>{{item}}</li>
      </ul>
    </div>
    <div class="car-content">
        <div class="car-list" v-for="(item,index) in items">
          <div class="car-chose" @click="changeSelect(item)">
            <input type="checkbox" :checked="item.isChecked">
            <span class="car-circle"></span>
          </div>
          <div class="car-txtbox">
            <div class="car-img">
              <img :src="item.productImage" alt="img">
            </div>
            <div class="car-txtinfo">
              <div class="car-name">
                {{item.productName}}
              </div>
              <div class="car-salf">
                赠送：{{item.parts[0].partsName}}
              </div>
            </div>
          </div>
          <div class="car-shopmoney car-kong">
            {{item.productPrice}}
          </div>
          <div class="car-totalnum car-kong">
            <button @click="changeMoney(item,-1)">-</button>
            <input type="text" ref="input" v-model="item.productNumber">
            <button @click="changeMoney(item,1)">+</button>
            <p>有货</p>
          </div>
          <div class="car-totalmoney car-kong">
            {{item.productPrice*item.productNumber}}
          </div>
          <div class="car-edit car-kong" @click = "deleteProduct(item)">
            <span>delete</span>
          </div>
        </div>
    </div>
    <div class="car-foot">
      <div class="car-allchose">
          <input type="checkbox" v-model="checkAllFlag" readonly>
          <button @click="checkAll(true)">全选</button>
          <button @click="checkAll(false)">取消全选</button>
      </div>
      <div class="car-allmoney">
          <span class="car-money">
            item Total:{{totalMoney | money("元") }}
          </span>
          <router-link :to="'/address'">
            <button class="car-check">结账</button>
          </router-link>
      </div>
    </div>
  </div>


</template>

<script>

require("es6-promise").polyfill();
require('isomorphic-fetch');

export default {
  name: 'carIndex',
  data () {
    return {
      navList:['商品信息','商品金额','商品数量','总金额','编辑'],
      items:[],
      totalMoney:0,
      checkAllFlag:false
    }
  },
  created(){
    let _this = this;
    fetch('./src/static/data.json').then(function(res){
      console.log(res)
      return res.json();
    }).then(function(stories){
      _this.items = stories.result.list;
    })
  },
  filters:{
      money(value,type){
        return '￥'+value.toFixed(2)+type;
      }
  },
  methods:{
    changeMoney(item,way){
      if(way>0){
        item.productNumber++
      }else{
        item.productNumber--;
        if(item.productNumber<=1){
          item.productNumber=1;
        }
      }
      this.calcTotalMoney();
    },
    changeSelect(item){
      if(typeof(item.isChecked)=='undefined'){
        this.$set(item,"isChecked",true)
      }else{
        item.isChecked = !item.isChecked;
        if(item.isChecked == false){
          this.checkAllFlag = false;
        }
      }
      this.calcTotalMoney();
    },
    checkAll(flag){
      this.checkAllFlag = flag;
      this.items.forEach((item)=>{
        if(typeof(item.isChecked)=='undefined'){
          this.$set(item,"isChecked",flag)
        }else{
          item.isChecked = flag;
        }
      })
      this.calcTotalMoney();
    },
    calcTotalMoney(){
      this.totalMoney = 0;
      this.items.forEach((item)=>{
        if(item.isChecked){
          this.totalMoney += item.productPrice * item.productNumber;
        }
      })
    },
    deleteProduct(item){
      let index = this.items.indexOf(item);
      this.items.splice(index,1)
    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  *{
    padding: 0;
    margin: 0;
  }
  button{
    cursor: pointer;
  }
  ul,li{
    list-style: none;
  }
  div.car-title{
    padding: 25px 0;
    position: relative;
    h4{
      color: #666;
      background: #fff;
      position: relative;
      z-index: 11;
      display: inline-block;
      padding: 0 15px;
      font-size: 24px;
    }
  }
  div.car-title:after{
    position: absolute;
    display: block;
    content:'';
    width: 100%;
    height: 0;
    border-top: 1px solid #dcdcdc;
    top: 50%;
  }
  
  /*nav*/
  .car-nav{
    height: 50px;
    line-height: 50px;
    background: #058;
    color: #fff;
    ul{ 
      li:not(:first-child){
        flex-basis: 15%;
      }
      li:first-child{
        flex-basis: 40%;
      }
    }
  }
  .car-nav ul,.car-content .car-list,.car-txtbox{
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }
  /*list*/
  .car-content{
    .car-list{
      border-bottom: 1px solid #dcdcdc;
      padding: 10px 0;
      .car-chose{
        flex-basis: 5%;
      }
      .car-txtbox{
        flex-basis: 35%;
      }
      .car-kong{
        flex-basis: 15%;
      }
      .car-img{
        flex-basis: 50%;
      }
      button{
        width: 30px;
        border: 1px solid #dcdcdc;
        height:30px;
        line-height: 28px;
        font-size: 20px;
        background: #058;
        color: #fff;
        outline: none;
        vertical-align: bottom;
        margin-left: -5px;
        cursor: pointer;
      }
      button:hover{
        background: #0e78b7;
      }
      input[type=text]{
        width: 35px;
        height: 28px;
        outline: none;
        vertical-align: bottom;
        border:1px solid #058;
        border :0;

      }
    }
  }

  /*ffot*/
  .car-foot{
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .car-check{
      height: 40px;
      line-height: 40px;
      border:0;
      border-radius: 5px;
      background: #ff5722;
      color: #fff;
      padding: 0 30px;
      font-size: 16px;
    }
    .car-check:hover{
      background: #e91e63;
    }
  }
</style>
