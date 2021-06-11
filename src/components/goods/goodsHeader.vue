<template>
	<div class="header">
		
		<div class="back" @click="toBack">
			<i class="icon iconfont">&#xe646;</i>
			</div>
			
		<div class="title">
			<div ><span>{{header}}</span></div>
		</div>
		
	</div>
</template>

<script>
	export default{
		props:[
			"header"
		],
		methods:{
			toBack(){
				 this.$router.go(-1);
			}
		}
	}
</script>

<style scoped="scoped">
	.header{
		width: 100%;
		height: 40px;
		background-color: #f5f5f5;
		display: flex;
		position: fixed;
		z-index: 10;
		top: 0;
	}
	.back{
		position: absolute;
		margin: 0 8px;
		height: 40px;
		width: 30px;
		line-height: 40px;
		text-align: center;
	}
	
	.title{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
