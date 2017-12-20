<template>
	<transition name="foodModel">
		<div class="food-infobox">
			<div class="food-head">
				<div class="food-back"><span class="icon-arrow_lift" @click="handleBack"></span></div>
				<div class="title-img">
					<img :src="selectFood.image" alt="">
				</div>
				<div class="food-namebox">
					<div class="title-name">
						<h4>{{selectFood.name}}</h4>
						<span class="food-salf">月售{{selectFood.sellCount}}份</span>
						<span class="food-salf">好评率{{selectFood.rating}}%</span>
					</div>
					<div class="food-foot">
						<div class="food-price">
							<span class="price-new">￥{{selectFood.price}}</span>
							<span class="price-old" v-if="selectFood.oldPrice">￥{{selectFood.oldPrice}}</span>
						</div>
						<div class="food-btn">
							<span class="food-carbtn" @click="handleCarBtn" v-show="!selectFood.count || selectFood.count===0">加入购物车</span>
							<car-controll :food='selectFood' v-show="selectFood.count>0" @handleAdd='handleAdd(selectFood,$event)' @handleDecrease="handleDecrease(selectFood)"></car-controll>
						</div>
					</div>
				</div>
			</div>
			<div class="food-description">
				<h4 class="food-desctitle">商品介绍</h4>
				<div class="food-desctxt">
					{{selectFood.info}}
				</div>
			</div>
			<div class="ratings-box">
				<h4 class="food-ratingtitle">商品评价</h4>
				<rating-item :foodRate="selectFood.ratings" :headDesc="headDesc" :onlyContent="onlyContent" :selectType="selectType" @handleSelect="handleSelect" @handleToggleContent='handleToggleContent' ></rating-item>
				<div class="food-ratinginfo" v-show="selectFood.ratings.length>0">
					<div class="food-ratinglist" v-for="item in selectFood.ratings" v-show="filterRate(item.rateType,item.text)">
						<div class="rat-title">
							<div class="rat-date">
								{{item.rateTime | rateDate}}
							</div>
							<div class="rat-preson">
								<span class="username">{{item.username}}</span>
								<img :src="item.avatar" alt="">
							</div>
						</div>
						<div class="rat-content">
							<span :class="item.rateType===0?'icon-thumb_up':'icon-thumb_down'"></span>
							<span class="rat-txt">{{item.text}}</span>
						</div>
					</div>
				</div>
				<div class="no-info" v-show="selectFood.ratings.length<=0">暂无评价</div>
			</div>
		</div>
	</transition>
</template>

<script>

	const ALL=2;
	import Vue from 'vue';
	import CarControll from '../cartControll/carControll';
	import RatingSelect from '../ratingSelect/ratingSelect'
	import {formatDate} from '../../../static/fontSize.js'

	Vue.filter('rateDate',function(date){
		return formatDate(new Date(1469281964000),'yyyy-MM-DD hh:mm:ss')
	})

	export default{
		name:'selectFood',
		props:{
			'selectFood':{
				type:Object,
				default:{}
			},
			'handleAdd':{
				type:Function
			},
			'handleDecrease':{
				type:Function
			}
		},
		components:{
		    'car-controll':CarControll,
		    'rating-item':RatingSelect
		},
		data(){
			return{
				showList:false,
				headDesc:{
					all:'全部',
					positive:'推荐',
					negative:'吐糟'
				},
				selectType:ALL,
				onlyContent:false
			}
		},
		computed:{
		},
		methods:{
			handleBack(){
				this.$emit('handleBack')
			},
			handleCarBtn(event){
				let targetX = event.target.getBoundingClientRect().left;
				let targetY = event.target.getBoundingClientRect().top;
				if(this.selectFood.count){
					this.selectFood.count = 0;
				}else{
					this.$set(this.selectFood,'count',0)
				}
				this.handleAdd(this.selectFood,{x:targetX,y:targetY})
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
		},
		mounted(){
			this.selectType = ALL;
			this.onlyContent = false;
		}
	}
</script>