<template>
	<div class="nav-tab">
		<router-link :to="'/goods'" exact>商品</router-link>
		<router-link :to="'/ratings'">评价</router-link>
		<router-link :to="'/seller'">商家</router-link>
	</div>
</template>

<script>
	export default {
		name:'navTab',
		data(){
			return{
			}
		},
		mounted(){
		}
	}
</script>