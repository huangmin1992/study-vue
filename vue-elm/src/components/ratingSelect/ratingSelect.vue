<template>
	<div class="food-ratings">
		<div class="food-ratingbtns">
			<div class="food-ratingKinds" :class="{'active':selectType===2}" @click="handleSelect(2)">{{headDesc.all}}{{foodRate.length}}</div>
			<div class="food-ratingKinds" :class="{'active':selectType===0}" @click="handleSelect(0)">{{headDesc.positive}}{{recommend}}</div>
			<div class="food-ratingKinds" :class="{'active':selectType===1}" @click="handleSelect(1)">{{headDesc.negative}}{{dislike}}</div>
		</div>
		<div class="food-ratingchose">
			<span class="food-inp" :class="{active:onlyContent}" @click="handleToggleContent">
				<span class="icon-check_circle"></span>
			</span>
			只看有内容的评价
		</div>
		
	</div>
</template>
<script>

const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;


export default {
	name: 'rating',
	props:{
		'foodRate':{
			type:Array,
			default:[]
		},
		'headDesc':{
			type:Object,
			default(){
				return{	
					all:"全部",
					positive:'满意',
					negative:'不满意'
				}
			}
		},
		'selectType':{
			type:Number,
			default:ALL
		},
		onlyContent:{
			type:Boolean,
			default:false
		}
	},
	computed:{
		recommend(){
			let count = 0;
			this.foodRate.forEach((item)=>{
				if(item.rateType=== POSITIVE){
					count++;
				}
			})
			return count
		},
		dislike(){
			let count = 0;
			this.foodRate.forEach((item)=>{
				if(item.rateType === NEGATIVE){
					count++;
				}
			})
			return count
		},
	},
	filters:{
		
	},
	data () {
		return {
			showRate:[]
		}
	},
	methods:{
		handleSelect(type){
			this.$emit('handleSelect',type)
		},
		handleToggleContent(){
			this.$emit('handleToggleContent')
		},

	},
	mounted(){
	}
}
</script>