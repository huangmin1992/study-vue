<template>
	<div>
		hello routerlink
		<input type="text" v-model="msg">
		<my-child :msg="msg"></my-child>
		<h4>{{msg}}</h4>
		<h5>{{ $route.params.id }}</h5>
	</div>
</template>


<script>
	export default{
		name:'test',
		data(){
			return{
				msg:''
			}
		},
		created(){
			console.log(this.$route.params.id)
		},
		components:{
			'my-child':{
				props:["msg"],
				template:"<div>{{msg}}</div>"
			}
		}
	}
</script>