<template>
	<div class="seller-content">
		<div>
			<div class="seller-head">
				<div class="seller-small">
					<div class="seller-title">
						<div class="seller-name">{{seller.name}}</div>
						<div class="seller-star">
							<star-item :size="36" :scroe="seller.score"></star-item>
							<span>月售{{seller.sellCount}}单</span>
						</div>
					</div>
					<div class="seller-mark" :class="{remark:remarkFlag}" @click="remarkFlag=!remarkFlag">
						<span class="icon-favorite"></span>
						<span>{{remarkTxt}}</span>
					</div>
				</div>
				<div class="seller-info">
					<div class="seller-minPrice">
						<span class="seller-priceTxt">起送价</span>
						<span class="seller-numer">{{seller.minPrice}}</span>元
						
					</div>
					<div class="seller-deliveryPrice">
						<span class="seller-priceTxt">商家配送</span>
						<span class="seller-numer">{{seller.deliveryPrice}}</span>元
					</div>
					<div class="seller-deliveryTime">
						<span class="seller-priceTxt">平均配送时间</span>
						<span class="seller-numer">{{seller.deliveryTime}}</span>分钟
					</div>
				</div>
			</div>
			<div class="seller-activebox">
				<div class="seller-notice">
					<h4 class="notice-title">公告与活动</h4>
					<div class="notice-txt">{{seller.bulletin}}</div>
				</div>
				<div class="seller-supports">
					<ul>
						<li class="supports-list" v-for="item in seller.supports">
							<span class="supports-icon" :class="'icon'+item.type"></span>
							<span class="supports-txt">{{item.description}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="seller-imgs">
				<h4 class="imgs-title">商家实景</h4>
				<swiper :options="swiperOption">
			        <swiper-slide v-for="item in seller.pics">
						<img :src="item" alt="">
			        </swiper-slide>
			      </swiper>
			</div>
			<div class="seller-infomation">
				<h4 class="info-title">商家信息</h4>
				<div class="info-txt" v-for="item in seller.infos">{{item}}</div>
			</div>
		</div>
	</div>
</template>
<script>

import Star from '../stars/star';

export default {
  name: 'seller',
  props:{
  	'seller':{
  		type:Object,
  		default:{},
  	}
  },
  components:{
  	'star-item':Star
  },
  data () {
    return {
    	remarkFlag:false,
    	swiperOption: {
          slidesPerView: 3,
          spaceBetween: 12,
          freeMode: true
        }
    }
  },
  computed:{
  	remarkTxt(){
  		return this.remarkFlag?'已收藏':'未收藏'
  	}
  }
}
</script>