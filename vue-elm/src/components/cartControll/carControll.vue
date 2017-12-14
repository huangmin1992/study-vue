<template>
	<div class="cart-controll">
		<transition name='circle'>
			<div class="cart-decrease cart-btns" v-show="food.count>0" @click="handleDecrease">
				<span class="icon-remove_circle_outline circle-inner"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add cart-btns" @click='handleAdd($event)'><span class="icon-add_circle"></span></div>
	</div>
</template>

<script>
	export default{
		name:'carControll',
		props:{
			food:{
				type:Object,
				default:{}
			}
		},
		data(){
			return{
				msg:'hello'
			}
		},
		methods:{
			handleAdd(event){
				//getBoundingClientRect() 元素相对于窗口的位置，包括left,top,right,bottom
				let targetX = event.target.getBoundingClientRect().left;
				let targetY = event.target.getBoundingClientRect().top;
				this.$emit('handleAdd',{x:targetX,y:targetY});
			},
			handleDecrease(){
				this.$emit('handleDecrease')
			}
		}
	}
</script>