<template>
	<div>
	<div class="container">
		<div class="adress">
			<i class="icon iconfont">&#xe611;</i>
			{{city}}
		</div>
		<div class="input-box">
			<input type="text"  placeholder="input word..."/>
			<i class="icon iconfont">&#xe69e;</i>
		</div>
		<div class="icon-btn">
			<i class="icon iconfont">&#xe759; </i>
		</div>
	</div>	
	
	<!-- 站位 -->
	<div class="place"></div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				city:"广州"
			}
		}
	}
</script>

<style scoped="scoped">
	.container{
		width: 92%;
		height: 50px;
		padding: 0 4%;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 100;
		background-color: #fff;
	}
	
	.adress{
		width: 80px;
		height: 30px;
		display: flex;
		align-items: center;
		font-size: 14px;
	}
	.adress .icon{
		height: 30px;
		font-size: 21px;
		margin-right:3px ;
		display: flex;
		align-items: center;
		color: #ffc50a;
	}
	
	.input-box{
		display: flex;
		align-items: center;
		position: relative;
		height: 30px;
		width: 100%	;
		border-radius: 15px;
		background-color: #f5f5f5;			
	}
	.input-box input{
		height: 20px;
		padding-left: 14px;
		margin-left: 5px;
		font-size: 13px;
		border:none;
		background-color: #f5f5f5;
	}
	.input-box .icon{
		display: flex;
		align-items: center;
		position: absolute;
		width: 30px;
		height: 30px;
		font-size: 17px;
		color: #c0c0c0;
		top: 0;
		right: 0;
	}
	
	.icon-btn{
		width: 30px;
		width: 30px;
		display: flex;	
	}
	.icon-btn .icon{
		width: 30px;
		width: 30px;
		font-size: 21px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	
	.place{
		background-color: #ffffff;
		height: 55px;
	}
</style>
