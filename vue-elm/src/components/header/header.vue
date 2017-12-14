<template>
	<div>
		<div class="elem-header">
			<div class="header-box">
				<div class="header-img">
					<img :src="headerInfo.avatar" alt="">
				</div>
				<div class="header-txtbox">
					<div class="header-name">
						<span class="name-icons"></span>
						{{headerInfo.name}}
					</div>
					<div class="header-transform">
						{{headerInfo.description}}/{{headerInfo.deliveryTime}}分钟送达
					</div>
					<div class="header-sale">
						<span class="sale-icon"></span>
						<span class="sale-txt">{{headerInfo.supports[0].description}}</span>
						<span class="sale-num" @click="handleModel">{{headerInfo.supports.length}}个<span class="icon-keyboard_arrow_right"></span></span>
					</div>
				</div>
			</div>
			<div class="header-foot" @click="handleModel">
				<span class="foot-icon"></span>
				<span class="foot-txt">{{headerInfo.bulletin}}</span>
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<model-item v-if='modelShow' @close='close' :headerArr='headerInfo'></model-item>
	</div>
</template>
<script>
import Model from './header-model';
export default {
  name: 'header',
  props:{
  	'headerArr':{
  		type:Object,
  		default:{}
  	}
  },
  components:{
  	'model-item':Model
  },
  data () {
    return {
    	modelShow:false
    }
  },
  computed:{
  	headerInfo(){
  		// 父组件异步调用传递数据，有可能渲染完成后，数组还没拿到，拿到后，mounted也不会再次更新，所以用computed监听数据,获取数据
  		return this.headerArr
  	}
  },
  methods:{
  	handleModel(){
      this.modelShow = true;
      document.getElementsByTagName('body')[0].className='scroll-hidden'
    },
    close(){
      this.modelShow = false;
      document.getElementsByTagName('body')[0].removeAttribute('class','scroll-hidden')
    }
  },
  mounted(){
    
  }
}
</script>