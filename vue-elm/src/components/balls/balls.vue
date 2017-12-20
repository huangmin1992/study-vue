<template>
	<transition-group
		@before-enter="beforeEnter"
		@enter="enter"
		@after-enter="afterEnter"
		name="drop"
	>
	<div class="balls-box" v-if='ball.show' v-for='ball in ballsBool' key="item">
		<span class="ball"></span>
	</div>
	</transition-group>
</template>
<script>
	export default{
		name:'balls',
		props:{
			'ballsTarget':{
				type:Object,
				default:{}
			},
			'ballsBool':{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				
			}
		},
		computed:{
		},
		methods:{
			beforeEnter(el){
				let count = this.ballsBool.length;
				while(count--){
					let ball = this.ballsBool[count];
					if(ball.show){
						let _left = this.ballsTarget.x-38;
						let _top =-(window.innerHeight-this.ballsTarget.y-45);
						el.style.display = '';
						el.style.transform = `translate3d(0,${_top}px,0)`;
						let inner = el.getElementsByClassName('ball')[0];
						inner.style.transform=`translate3d(${_left}px,0,0)`;
					}
				}
			},
			enter(el,done){
				let refresh = el.offsetHeight;
				this.$nextTick(()=>{
					setTimeout(()=>{
						el.style.transform = `translate3d(0,0,0)`
						let inner = el.getElementsByClassName('ball')[0];
							inner.style.transform=`translate3d(0,0,0)`;
					},100)
				})
				done()
			},
			afterEnter(el){
				let ball = this.ballsBool[0];
				if(ball){
					setTimeout(()=>{
						ball.show = false;
						el.style.display="none"
					},500)
				}
			}
		}
	}
</script>