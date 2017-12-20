<template>
	<div class="rate-content">
		<div class="rate-head">
			<div class="rate-left">
				<div class="rate-rank">
					{{seller.score}}
					<p>综合评分</p>
				</div>
				<div class="rate-ranktxt">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="rate-right">
				<div class="rate-server">
					<div class="rate-small">服务态度</div>
					<div class="rate-small-show">
						<star-item :size="36" :scroe="seller.serviceScore"></star-item>
					</div>
						<div class="rate-ratescore">{{seller.serviceScore}}</div>
				</div>
				<div class="rate-food">
					<div class="rate-small">美食评分</div>
					<div class="rate-small-show">
						<star-item :size="36" :scroe="seller.foodScore"></star-item>
					</div>
						<div class="rate-ratescore">{{seller.foodScore}}</div>
				</div>
				<div class="rate-ranktime">
					<div class="rate-small">送达时间</div>
					<div class="rate-small-show">
						{{seller.deliveryTime}}分钟
					</div>
				</div>
			</div>
		</div>
		<div class="rate-box">
			<rating-item :foodRate="rateList" :onlyContent="onlyContent" :selectType="selectType" @handleSelect="handleSelect" @handleToggleContent='handleToggleContent' ></rating-item>
			<div class="rate-listbox">
				<div class="rate-list" v-for="item in rateList" v-show="filterRate(item.rateType,item.text)">
					<div class="userimg">
						<img :src="item.avatar" alt="">
					</div>
					<div class="rate-info">
						<div class="rate-userinfo">
							<div class="username">{{item.username}}</div>
							<div class="rate-times">
								{{item.rateTime | rateDate}}
							</div>
						</div>
						<div class="rate-score">
							<div class="rate-stars">
								<star-item :size="24" :scroe="item.score"></star-item>
							</div>
							<div class="rate-get">{{item.deliveryTime}}分钟送达</div>
						</div>
						<div class="rate-text">{{item.text}}</div>
						<div class="rate-positive">
							<span :class="item.rateType===0?'icon-thumb_up':'icon-thumb_down'" class="rate-pos"></span>
							<div class="rate-posname" v-show="item.recommend.length>0">
								<span class="rate-posinfo" v-for="val in item.recommend">{{val}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="no-rate" v-show="rateList.length<=0">暂无评价</div>
			</div>
		</div>
	</div>
</template>
<script>

require("es6-promise").polyfill();
require('isomorphic-fetch');

import Vue from 'vue';
import RatingSelect from '../ratingSelect/ratingSelect'
import {formatDate} from '../../../static/fontSize.js'
import Star from '../stars/star';

Vue.filter('rateDate',function(date){
	return formatDate(new Date(1469281964000),'yyyy-MM-DD hh:mm:ss')
})
const ALL = 2;

export default {
  name: 'rating',
  props:{
  	'seller':{
  		type:Object,
  		default:{}
  	}
  },
  components:{
  	'rating-item':RatingSelect,
  	'star-item':Star
  },
  data () {
    return {
    	rateList:[],
    	selectType:ALL,
    	onlyContent:false,
    }
  },
  mounted(){
  	this.$nextTick(()=>{
  		this.getRatings()
  	})
  	this.selectType = ALL;
  	this.onlyContent = false;
  },
  computed:{
  	
  },
  methods:{
  	getRatings(){
  		fetch('./api/ratings').then((res)=>{
  			return res.json()
  		}).then((stroies)=>{
  			this.rateList = stroies.data
  		})
  	},
  	handleSelect(type){
		this.selectType = type;
	},
	handleToggleContent(){
		this.onlyContent = !this.onlyContent
	},
	filterRate(type,text){
		if(this.onlyContent &&text===''){
			return false;
		}
		if(this.selectType === ALL){
			return true;
		}else{
			return this.selectType === type
		}
	}
  }
}
</script>