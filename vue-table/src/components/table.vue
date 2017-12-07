<template>
	<div>
		<div class="search-box">
			<input type="text" placeholder="请输入搜索信息" v-model='query'>
		</div>
		<div class="table">
			<table>
				<tr>
					<th>名称</th>
					<th>单价</th>
					<th>数量</th>
					<th>缩略图</th>
				</tr>
				<tr v-for="item in showLists">
					<td>{{item.name}}</td>
					<td>{{item.format}}</td>
					<td>{{item.number}}</td>
					<td><img :src="item.img" alt="img"></td>
				</tr>
			</table>
			<h4 v-if="showText">暂无这信息</h4>
		</div>
		<div class="pages">
			<ul>
				<li class="page-btn" @click="changePage(-1)">上一页</li>
				<li>第<input type="text" v-model="showPage">页</li>
				<li>总共{{totalPage}}页</li>
				<li class="page-btn" @click="changePage(1)">下一页</li>
			</ul>
		</div>
	</div>
</template>
<script>
	require('es6-promise').polyfill();
	require('isomorphic-fetch');
	export default{
		name:'table',
		data(){
			return{
				arrList:[],
				totalPage:0,
				limitPage:8,
				showPage:1,
				showList:[],
				filterList:[],
				query:'',
				showText:false
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getList();
			})
		},
		computed:{
			showLists(){
				this.getShowList();
				this.listFilter();
				return this.showList;
			}
		},
		methods:{
			getList(){
				fetch('./static/list.json').then((res)=>{
					return res.json()
				}).then((stroies)=>{
					this.arrList = stroies.list;
					/*this.showList = this.arrList.filter((item,index)=>{
						if(index<this.limitPage*this.showPage && index>=this.limitPage*(this.showPage-1)){
							return item;
						}
					})*/
					this.getShowList();
				})
			},
			getShowList(){
				this.showList = this.arrList.slice((this.showPage-1)*this.limitPage,this.showPage*this.limitPage)
				this.totalPage = Math.ceil(this.arrList.length/this.limitPage)

			},
			changePage(num){
				if(num === 1){
					this.showPage++;
					if(this.showPage>this.totalPage){
						this.showPage = this.totalPage;
						console.log('last')
					}
				}else if(num === -1){
					this.showPage--;
					if(this.showPage<=1){
						this.showPage = 1;
						console.log('first')
					}
				}
				this.getShowList()
			},
			listFilter(){
				if(this.query){
					 this.filterList = this.arrList.filter((item)=>{
						return item.name.indexOf(this.query)>-1
					})
					if(this.filterList.length===0){
						this.showText = true;
					}
					this.showList = this.filterList.slice((this.showPage-1)*this.limitPage,this.showPage*this.limitPage)
					this.totalPage = Math.ceil(this.filterList.length/this.limitPage)
				}else{
					this.showText = false;	
				}
			}
		},
		watch:{
			query(){
				console.log(this.query)
			}
		}
	}
</script>
<style scope lang='less'>
	ul,ol,li{
		list-style: none;
	}
	.table{
		width: 800px;
		margin: 0 auto;
		table{
			table-layout: fixed;
			width: 100%;
			text-align: center;
			line-height: 40px;
			border: 1px solid #ddd;
			border-spacing: 0;
			border-collapse: collapse;
			th,td{
				border-bottom: 1px solid #ddd;
			}
			td{
				cursor: pointer;
			}
			tr{
				transition: 0.3s;
			}
			tr:nth-child(2n){
				background: #f5f5f5;
			}
			tr:hover{
				background: #e8e8e8;
			}
		}
	}
	.search-box{
		padding: 25px 0;
		text-align: center;
		input[type=text]{
			height: 35px;
			border-radius: 5px;
			border:1px solid #ddd;
			width: 500px;
			padding-left: 10px;
		}
	}
	.pages{
		padding: 25px;
		text-align: center;
		ul>li{
			display: inline-block;
			margin: 0 10px;
			font-size: 18px;
		}
		li.page-btn{
			border:1px solid #ddd;
			border-radius: 5px;
			padding: 5px 25px;
			cursor: pointer;
			transition: 0.3s;
		}
		li.page-btn:hover{
			background: #03a9f4;
			color: #fff;
		}
		input[type=text]{
			width: 50px;
			height: 30px;
			border: 1px solid #ddd;
			margin: 0 5px;
			border-radius: 5px;
			vertical-align: middle;
			text-align: center;
		}
	}
</style>