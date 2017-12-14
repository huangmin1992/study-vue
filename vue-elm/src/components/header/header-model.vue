<template>
	<transition name='model'>
		<div class="model-mask">
			<div class="model-wrapper">
				<div class="model-content">
					<div class="model-name">{{modelInfo.name}}</div>
					<div class="model-star">
						<star-item :size="48" :scroe="modelInfo.score"></star-item>
					</div>
					<div class="model-desctitle">
						<div class="title-line"></div>
						<div class="model-descname">优惠信息</div>
						<div class="title-line"></div>
					</div>
					<div class="model-descinfo" v-if='modelInfo.supports'>
						<div class="model-desclist" v-for='item in modelInfo.supports'>
							<span class="model-descicon" :class='"icon"+item.type'></span>
							<span>{{item.description}}</span>
						</div>
					</div>
					<div class="model-desctitle">
						<div class="title-line"></div>
						<div class="model-descname">商家公告</div>
						<div class="title-line"></div>
					</div>
					<div class="model-mark">
						{{modelInfo.bulletin}}
					</div>
				</div>
			</div>
			<div class="model-close"><span class="icon-close" @click="closeModel"></span></div>
		</div>
	</transition>
</template>
<script>
	import Star from '../stars/star';
	export default{
		name:'model',
		props:{
			'headerArr':{
				type:Object,
				default:{}
			}
		},
		components:{
			'star-item':Star
		},
		data(){
			return{

			}
		},
		computed:{
			modelInfo(){
				return this.headerArr
			}
		},
		methods:{
			closeModel(){
				this.$emit('close')
			}
		}
	}
</script>