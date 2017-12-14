<template>
	<div class="goods-container" ref='goodsBody'>
		<div class="slide-wrapper" ref='menu'>
			<ul>
				<li class="slide-list" v-for="(item,index) in goodsList" :class="{'current':currentIndex===index}"
         @click='handleRun(index)' >
					<div class="slide-txtbox">
						<span class="slide-icon" v-if='item.type!==-1' :class='"icon"+item.type'></span>
						<span>{{item.name}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref='goodsContent'>
			<div class="goods-tranbox">
				<div class="goods-listbox" v-for='items in goodsList'>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
require("es6-promise").polyfill();
require('isomorphic-fetch');

import BScroll from 'better-scroll';

export default {
  name: 'goods',
  data () {
    return {
    	goodsList:{},
    	isScroll:true,
    	listHeight:[],
    	currentIndex:0,
      isAnimate:null
    }
  },
  computed:{

  },
  updated(){
  	this.$nextTick(()=>{
  		this.calcListHeight()
      console.log(this.currentIndex)
    })
  },
  mounted(){
    this.$nextTick(()=>{
  		this.getGoods();
  		this.$refs.goodsContent.addEventListener('scroll',this.handleScroll)
  	})
  },
  methods:{
  	getGoods(){
  		fetch('./api/goods').then((res)=>{
  			return res.json()
  		}).then((stroies)=>{
  			this.goodsList = stroies.data
  		})
  	},
  	handleScroll(){
  		let shopBox = this.$refs.goodsContent;
  		let elemContainerTop = document.querySelector('.elem-content').offsetTop;
  		shopBox.scrollTop>elemContainerTop?document.documentElement.scrollTop = elemContainerTop:document.documentElement.scrollTop = shopBox.scrollTop;
  		this.posCalc(this.listHeight,shopBox.scrollTop)
  	},
  	calcListHeight(){
  		if(this.calcListHeight.heightFlag){return;}
  		let shopBox = this.$refs.goodsContent;
  		let shopBoxTitle = shopBox.getElementsByClassName('goods-title');
  		if(shopBoxTitle.length !==0){
  			for(let i=0;i<shopBoxTitle.length;i++){
  				let timer = setTimeout(()=>{
  					this.listHeight.push({
  						index:i,
  						pos:shopBoxTitle[i].offsetTop
  					})
  				},500)
  			}
  		}
  		this.calcListHeight.heightFlag = true;
  	},
  	posCalc(listHeight,y){
  		//联动
  		if(listHeight.length<2){
  			this.run(listHeight[0].index)
  			return;
  		}
  		let prevArr = listHeight.slice(0,parseInt(listHeight.length/2,10));
  		let nextArr = listHeight.slice(parseInt(listHeight.length/2,10));

  		let prevArrIndex = prevArr[prevArr.length-1];
  		let nextArrIndex = nextArr[0];

  		if(prevArrIndex.pos > Math.abs(y)){
  			this.posCalc(prevArr,y);
  			return
  		}else if(nextArrIndex.pos<Math.abs(y)){
  			this.posCalc(nextArr,y);
  			return
  		}else if(prevArrIndex.pos<=Math.abs(y)&&nextArrIndex.pos>Math.abs(y)){
  			if(prevArrIndex.index === this.currentIndex){return;}
  			this.currentIndex = prevArrIndex.index;
  			return;
  		}
  	},
  	run(index){
  		this.currentIndex = index;
  	},
    scrollAnimate(obj,nowScrollTop,target){
      this.isScroll = false;
      window.cancelAnimationFrame(this.isAnimate);
      obj.scrollTop = Math.ceil(nowScrollTop+(target - nowScrollTop)/4);
      if(obj.scrollHeight - obj.scrollTop <= obj.offsetHeight + 4){
        obj.scrollTop = obj.scrollHeight - obj.offsetHeight;
        let timer = setTimeout(() => {
          this.isScroll = true;
          clearTimeout(timer)
        },50)
        console.log(this.isScroll+'0')
        return;
      }else if(Math.abs(obj.scrollTop - target)<=4){
        obj.scrollTop = target;
        let timer = setTimeout(() => {
          this.isScroll = true;
          clearTimeout(timer)
        },50)
        console.log(this.isScroll+'1')
        return;
      }else{
        this.isAnimate = requestAnimationFrame(()=>{
          this.scrollAnimate(this.$refs.goodsContent,obj.scrollTop,target)
        })
      }
      console.log(this.isScroll)
    },
    handleRun(index){
      let shopBox = this.$refs.goodsContent;
      this.isScroll = false;
      this.run(index);
      this.scrollAnimate(shopBox,shopBox.scrollTop,this.listHeight[index].pos)
      console.log(this.currentIndex,index)
    }
  }
}
</script>