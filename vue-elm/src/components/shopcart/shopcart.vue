<template>
	<div class="shop-cart">
		<div class="shop-content">
			<div class="shop-left">
				<div class="shop-circle">
					<div class="shop-mincircle" :class="{hasShop:totalCount>0}">
						<span class="icon-shopping_cart"></span>
						<span class="shop-number" v-show="totalCount>0">{{totalCount}}</span>
					</div>
				</div>
				<div class="shop-pricebox">
					<span class="shop-price">￥{{totalPrice}}</span>
					<span class="shop-transform">另需要配送费{{seller.deliveryPrice}}元</span>
				</div>
			</div>
			<div class="shop-right">
				<a href="javascript:;" class="shop-btns" :class="{'shop-pay':payFlag}">
					<span>{{payDesc}}</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name:'shopcart',
	props:{
		'seller':{
	      type:Object,
	      default:{}
	    },
	    'selectedFoods':{
	    	type:Array,
	    	default:[]
	    }
	},
	data(){
		return{
			payFlag:false
		}
	},
	computed:{
		totalPrice(){
			let total = 0;
			this.selectedFoods.forEach((food)=>{
				total+=(food.price*food.count)
			})
			return total;
		},
		totalCount(){
			let count = 0;
			this.selectedFoods.forEach((food)=>{
				count += food.count
			})
			return count;
		},
		payDesc(){
			if(this.totalPrice === 0){
				this.payFlag = false;
				return `￥${this.seller.minPrice}元起送`
			}else if(this.totalPrice < this.seller.minPrice){
				let diff = this.seller.minPrice - this.totalPrice;
				this.payFlag = false;
				return `还差￥${diff}元起送`
			}else{
				this.payFlag = true;
				return '去结算'
			}
		}
	}
}
</script>