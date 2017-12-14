<template>
    <div class="elem-contentbox" ref='goodsBody'>
  	<div class="goods-container">
  		<div class="slide-wrapper" ref='goodsMenu'>
  			<ul>
  				<li class="slide-list" v-for="(item,index) in goodsList" :class="{'current':currentIndex===index}" 
          @click="handleRun(index)">
  					<div class="slide-txtbox">
  						<span class="slide-icon" v-if='item.type!==-1' :class='"icon"+item.type'></span>
  						<span>{{item.name}}</span>
  					</div>
  				</li>
  			</ul>
  		</div>
  		<div class="goods-wrapper" ref='goodsContent'>
  			<div class="goods-tranbox">
  				<div class="goods-listbox goods-list-hook" v-for='items in goodsList'>
  					<div class="goods-title">{{items.name}}</div>
  					<div class="goods-list" v-for='item in items.foods'>
  						<div class="goods-box">
  							<div class="goods-img">
  								<img :src="item.icon" alt="">
  							</div>
  							<div class="goods-txtbox">
  								<h4>{{item.name}}</h4>
  								<p class="goods-desc goods-smallname" v-if="item.description">{{item.description}}</p>
  								<p class="goods-desc">
  									<span class="goods-number">月售{{item.sellCount}}份</span>
  									<span>好评率{{item.rating}}%</span>
  								</p>
  								<div class="goods-price">
  									<span class="price-now">￥{{item.price}}</span>
  									<span class="price-old" v-show="item.oldPrice">￥{{item.oldPrice}}</span>
  								</div>
  							</div>
                <car-controll :food='item' @handleAdd='handleAdd(item,$event)' @handleDecrease="handleDecrease(item)"></car-controll>
              </div>
  					</div>
  				</div>
  			</div>
  		</div>
    </div>
    <shop-cart :seller="seller" :selectedFoods='selectedFoods'></shop-cart>
    <ball-item :ballsTarget="ballsTarget" :ballsBool="ballsBool"></ball-item>
  </div>
</template>
<script>
require("es6-promise").polyfill();
require('isomorphic-fetch');

import BScroll from 'better-scroll';

import ShopCart from '../shopcart/shopcart';
import CarControll from '../cartControll/carControll';
import Balls from '../balls/balls';

export default {
  name: 'goods',
  props:{
    'seller':{
      type:Object,
      default:{}
    }
  },
  data () {
    return {
    	goodsList:{},
    	listHeight:[],
      scrollY:0,
      ballsTarget:{},
      ballsBool:[
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          }
        ]
    }
  },
  components:{
    'shop-cart':ShopCart,
    'car-controll':CarControll,
    'ball-item':Balls
  },
  computed:{
    currentIndex(){
      for(let i=0;i<this.listHeight.length;i++){
        let heightPrev = this.listHeight[i];
        let heightNext = this.listHeight[i+1];
        if(!heightNext || (this.scrollY>=heightPrev && this.scrollY < heightNext)){
          return i;
        }
      }
      return 0;
    },
    selectedFoods(){
      let foodArr = [];
      if(this.goodsList.length>0){
        this.goodsList.forEach((item)=>{
          item.foods.forEach((food)=>{
            if(food.count>0){
              foodArr.push(food)
            }
          })
        })
      }
      return foodArr;
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.getGoods();
    })
  },
  methods:{
    getGoods(){
      fetch('./api/goods').then((res)=>{
        return res.json()
      }).then((stroies)=>{
        this.goodsList = stroies.data
        this.$nextTick(()=>{
          this.initScroll()
          this.calcHeight()
          this.$refs.goodsBody.style.height = document.querySelector('.elem-content').offsetHeight - document.querySelector('.nav-tab').offsetHeight+ 'px';
        })
  		})
  	},
    initScroll(){
      this.menuScroll = new BScroll(this.$refs.goodsMenu,{
        click:true
      });
      this.goodsScroll = new BScroll(this.$refs.goodsContent,{
        probeType:3,
        click:true
      })
      //goodsList增加滚动事件
      this.goodsScroll.on('scroll',(pos)=>{
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calcHeight(){
      let foodList = this.$refs.goodsContent.getElementsByClassName('goods-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for(let i=0;i<foodList.length;i++){
        height += foodList[i].offsetHeight;
        this.listHeight.push(height);
      }
    },
    handleRun(index){
      let foodList = this.$refs.goodsContent.getElementsByClassName('goods-list-hook');
      let currentFood = foodList[index];
      this.goodsScroll.scrollToElement(currentFood,300);
    },
    handleAdd(item,event){
      this.ballsTarget={}
      //emit穿参，当父组件有默认参数时，需要通过$event获取子组件传的参数
     if(!item.count){
      this.$set(item,'count',1);
     }else{
      item.count++;
     }
     this.ballsTarget = event
     for(let i=0;i<this.ballsBool.length;i++){
        let ball = this.ballsBool[i];
        if(!ball.show){
            ball.show = true;
            return;
        }
     }
    },
    handleDecrease(item){
      if(item.count){
        item.count--;
      }
    }
  }
}
</script>