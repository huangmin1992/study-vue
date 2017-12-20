<template>
	<transition name='model'>
		<div class="model-cartbox">
			<div class="model-mask" @click.prevent="modelHidden()"></div>
			<div class="cart-model">
				<div class="cart-model-header">
					<div class="cart-model-title">购物车</div>
					<div class="cart-clear" @click='clearSelectFoods'>清空</div>
				</div>
				<div class="cart-shoplist">
					<ul>
						<li class="cart-shopInfo" v-for="item in selectedFoods">
							<div class="cart-shopname">{{item.name}}</div>
							<div class="cart-shopright">
								<span class="cart-shopprice">￥{{item.price*item.count}}</span>
								<car-controll :food='item' @handleAdd='handleAdd(item,$event)' @handleDecrease="handleDecrease(item)"></car-controll>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import CarControll from '../cartControll/carControll';
	export default{
		name:'cartModel',
		props:{
			'selectedFoods':{
				type:Array,
				default:[]
			},
			'handleAdd':{
				type:Function
			},
			'handleDecrease':{
				type:Function
			}
		},
		data(){
			return{

			}
		},
	    components:{
		    'car-controll':CarControll,
		},
		mounted(){
			
		},
		methods:{
			modelHidden(){
				this.$emit('modelHidden')
			},
			clearSelectFoods(){
				this.$emit('clearSelectFoods')
			}
		}
	}
</script>