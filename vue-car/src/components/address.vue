<template>
	<div class="address-box">
		<div class="navbar">
			<div class="navbar-list" :class="{active:isShow}">地址确认</div>
			<div class="navbar-list">查看订单</div>
			<div class="navbar-list">支付</div>
			<div class="navbar-list">订单确认</div>
		</div>
		<div class="addr-title">
			<span>配送地址</span>
		</div>
		<div class="addr-infobox">
			<div class="addr-box addr-list" v-for="item in filtersAddr">
				<div class="border-line" :class="{borderActive:item.isDefalut}">
					<div class="txt-left">
						<h4>{{item.userName}}</h4>
						<p>{{item.streetName}}</p>
						<p>{{item.tel}}</p>
						<p class="default-addr">
							<span v-if="item.isDefalut">默认地址</span>
							<span class="default-shezhi" :class="{defaultNone:item.isDefalut}" @click="selectAddr(item.addressId)">设为默认</span>
						</p>
					</div>
					<div class="txt-btn">
						<div class="addr-btn">edit</div>
						<div class="addr-btn" @click="deleteAddr(item)">delte</div>
					</div>
				</div>
			</div>
			<div class="addr-box">
				<div class="border-line">
					<div>
						<p>+</p>
						<span>添加新地址</span>
					</div>
				</div>
			</div>
		</div>
		<div class="more" @click="moreAddr">more.</div>
	</div>
</template>
<script>
	require("es6-promise").polyfill();
	require('isomorphic-fetch');
	export default {
		name:"address",
		data(){
			return{
				addressList:[],
				limitNumber:3,
				isShow:true
			}
		},
		created(){
			fetch('./src/static/address.json').then((res)=>{
				return res.json();
			}).then((stories)=>{
				this.addressList = stories.result;
				console.log(stories)
			})
		},
		computed:{
			filtersAddr(){
				return this.addressList.slice(0,this.limitNumber)
			}
		},
		methods:{
			selectAddr(addressId){
				this.addressList.forEach((item)=>{
					if(item.addressId==addressId){
						item.isDefalut = true;
					}else{
						item.isDefalut = false;
					}
				})
			},
			moreAddr(){
				this.limitNumber = this.addressList.length;
			},
			deleteAddr(item){
				let index = this.addressList.indexOf(item);
				this.addressList.splice(index,1);
				console.log(this.addressList)
			}
		}
	}
</script>

<style scope lang="less">
	.navbar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 70px;
		line-height: 70px;
		text-align: center;
		font-size: 18px;
		color: #494848;
		.navbar-list{
			flex-basis: 25%;
			border-bottom: 2px solid #dcdcdc;
			position: relative;
		}
		.navbar-list:after{
			display: block;
			position: absolute;
			content: '';
			width: 15px;
			height: 15px;
			background: #dcdcdc;
			border-radius: 50%;
			left: 50%;
			bottom: -7px;
			margin-left: -7px;
		}
		.navbar-list.active{
			color: #ff5722;
			border-color: #ff5722;
		}
		.navbar-list.active:after{
			background: #ff5722;
		}
	}
	.addr-title{
		position: relative;
		line-height: 35px;
		height: 35px;
		margin: 50px 0;
		span{
			display: inline-block;
			background: #fff;
			padding: 0 25px;
		}
	}
	.addr-title:after{
		display: block;
		content: '';
		position: absolute;
		width: 100%;
		height: 0;
		border-top:1px solid #dcdcdc;
		top: 50%;
		z-index: -1;
	}
	.addr-infobox{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		div.addr-box{
			box-sizing: border-box;
			flex-basis: 25%;
			padding: 0 15px;
			margin-bottom: 20px;
			height: 180px;
			.border-line{
				width: 100%;
				height: 100%;
				border: 2px solid #dcdcdc;
				display: flex;
				justify-content: space-around;
				cursor: pointer;
				.addr-btn{
					background: #9c27b0;
					margin: 25px 0;
					padding: 5px 15px;
					color: #fff;
					cursor: pointer;
					transition: 0.3s;
				}
				.addr-btn:hover{
					background: #450250;
				}
				.default-addr{
					color: orange;
				}
				.default-shezhi{
					opacity: 0;
					transition: 0.3s;
				}
				.defaultNone{
					display: none;
				}
			}
			.border-line:hover .default-shezhi{
				opacity: 1;
			}
		}
	}
	.addr-infobox .addr-box:hover .border-line,.addr-infobox div.addr-box .borderActive{
		border-color: orange;
	}
	.more{
		padding: 15px;
		cursor: pointer;
		width: 70px;
		height: 35px;
		line-height: 35px;
		margin: 0 auto;
		border: 1px solid #ddd;
		background: orange;
		color: #fff;
	}
</style>