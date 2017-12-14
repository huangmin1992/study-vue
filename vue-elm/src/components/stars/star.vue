<template>
	<div class="star-box" :class='starType'>
		<span v-for="item in starClass" :class="item" class="star-item"></span>
		1
	</div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = "off"; 

export default{
	name:'star',
	props:{
		'size':{
			type:Number,
			default:24
		},
		'scroe':{
			type:Number,
			default:0
		}
	},
	computed:{
		starType(){
			return 'star-'+this.size
		},
		starClass(){
			let result = [];
			let integer = Math.floor(this.scroe*2)/2;
			let hasDecimal = this.scroe%1 !==0;
			for(let i=0;i<integer;i++){
				result.push(CLS_ON)
			}
			if(hasDecimal){
				result.push(CLS_HALF)
			}
			while(result.length<LENGTH){
				result.push(CLS_OFF)
			}
			return result;
		}
	},
	data(){
		return{

		}
	}
}
</script>