<template>
    <div>
        <div class="bg">
				<div class="icon-content">
					<i class="icon iconfont">&#xe6f8; </i>
				</div>
			
				<div class="img-content">
					<img src="../../../static/img/category/6.jpg" />
				</div>
				
				<div @click="login_register()" class="text-content">
					<p class="text">{{login_text}}</p>
				</div>
				
		</div>
		
		<div class="center-tabbar">
			<ul>
				<li>
					<p>处理中</p>
					<i class="icon iconfont">&#xe650; </i>
				</li>
				<li>
					<p>已完成</p>
					<i class="icon iconfont">&#xe631; </i>
				</li>
				<li>
					<p>待评价</p>
					<i class="icon iconfont">&#xe679; </i>
				</li>
				<li>
					<p>退换货</p>
					<i class="icon iconfont">&#xe61b; </i>
				</li>
			</ul>
		</div>
		
		<div class="bottom-tabbar">
			<ul>
				<li>
					<i class="icon iconfont">&#xe625; </i>
					<p>账号管理</p>
				</li>
				<li>
					<i class="icon iconfont">&#xe61e; </i>
					<p>购物记录</p>
				</li>
				<li>
					<i class="icon iconfont">&#xe602; </i>
					<p>我的足迹</p>
				</li>
				<li>
					<i class="icon iconfont">&#xe663; </i>
					<p>我的收藏</p>
				</li>
			</ul>
			<ul>
				<li>
					<i class="icon iconfont">&#xe603; </i>
					<p>关于我们</p>
				</li>
				<li>
					<i class="icon iconfont">&#xe759; </i>
					<p>消息提醒</p>
				</li>
				<li>
					<i class="icon iconfont">&#xe608; </i>
					<p>私人订制</p>
				</li>
				<li>
					<i class="icon iconfont">&#xe647; </i>
					<p>售后服务</p>
				</li>
			</ul>
		</div>

       

    </div>
</template>

<script>
export default {
	data() {
		return {
			login_text:"登录/注册"
		}
	},
	methods:{
		login_register(){
			this.$router.push({path:'/login'});
		}
		
	}
}
</script>

<style scoped>
    .bg{
		width: 100%;
		height: 240px;
		background-color: #1c1f28;
		border-radius: 0 0 20% 20%;
		
	}
	.bg .icon-content{
		padding: 10px 10px 15px 10px;
		display: flex;
		justify-content: flex-end;
	}
	.bg .icon-content i{
		color: #FFF;
		font-size: 22px;
	}
	.bg .img-content{
		display: flex;
		justify-content:center;
	}
	.bg .img-content img{
		border-radius: 50%;
		width: 80px;
		height: 80px;
		
		}
	.bg .text-content .text{
		font-size: 13px;
		color: #FFF;
		text-align: center;
		padding-top: 10px;
	}
	
	.center-tabbar{
		width: 90vw;
		margin-left: 5vw;
		margin-right: 5vw;
		margin-top: -50px;
		border-radius: 5px;
		height: 100px;
		box-shadow: 0px 5px 10px #999;
		background-color: #FFF;	
	}
	.center-tabbar ul{
		display: flex;
		justify-content: space-between;
		padding: 10px 20px;
		
	}
	.center-tabbar ul li{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.center-tabbar ul li p{
		padding-top: 5px;
		font-weight: 600;
	}
	.center-tabbar ul li i{
		padding-top: 5px;
		text-align: center;
		font-size: 30px;
		color: #a4a4a6;
	}
	
	.bottom-tabbar ul{
		display: flex;
		justify-content: space-between;
		padding: 7vw 30px 0 30px;
	}
	.bottom-tabbar ul li{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.bottom-tabbar ul li p{
		padding-top: 5px;
		font-weight: 500;
		letter-spacing: 1px;
		color: #888888;
		font-size: 12px;
	}
	.bottom-tabbar ul li i{
		padding-top: 5px;
		text-align: center;
		font-size: 2.1875rem;
		color: #a1d2e8;
	}
</style>

