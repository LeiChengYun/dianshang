<template>
	<div class="bg">
		<div class="det" @click="goback()">
			<i class="icon iconfont">&#xe7aa; </i>
		</div>
		<div class="toux">
			<img src="../../../static/img/category/6.jpg" />
		</div>
		<div class="input">
			<div class="input-user">
				<input type="text" v-model="username" placeholder="QQ号/手机号/邮箱"/>
			</div>
			<div class="input-password">
				<input type="password" v-model="userpassword" placeholder="密码"/>
			</div>
			<div class="input-buttom">
				<button type="submit" @click="login()">登录</button>
			</div>
		</div>
		<div class="wangji">
				<p>忘记密码?</p>
				<p>新用户登入</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
export default{
	data() {
		return{
			username:"",
			userpassword:""
		}
	},
	methods:{
		goback(){
			this.$router.go(-1);
		},
		login(){
			// console.log(this.username.length,this.userpassword);
			if(this.username.length > 15 || this.username.length == 0){
				this.handlePromotion("用户名长度限制在1到15个字符之间！");
				return;
			}else if(this.userpassword.length < 4 || this.userpassword.length > 15){
				this.handlePromotion("密码长度限制在6到15个字符之间！");
				return;
			}else{
				// this.handlePromotion("通过验证！");
				fetch("http://localhost:3001/user/login",{
					method:'post',
					body:'us='+this.username+'&'+'ps='+this.userpassword,
					headers:{
						'Content-Type':'application/x-www-form-urlencoded',
					}
				})
				.then(res=>{
					return res.json()
				})
				.then(myJson=>{
					console.log(myJson)
					if(myJson.err == 0){
						this.handlePromotion("登陆成功！")
					}else if(myJson.err == 1){
						this.handlePromotion("用户/密码不正确！")
					}else{
						return
					}
				})
				
			}
		},
		handlePromotion(title){
			Toast({
			  message: title,
			  duration: 2000
			});
		},
	}
}
</script>

<style scoped="scoped">
	.bg{
		height: 100vh;
		background-image:url(../../../static/img/bizhi.jpg);
		background-size: 100vw 100vh;
		background-repeat: no-repeat;
	}
	.det{
		padding: 8vh 8vh;
	}
	.det i{
		font-size: 20px;
		color: #FFF;
	}
	.toux{
		width: 100%;
		display: flex;
		justify-content: center;
		
	}
	.toux img{
		height: 100px;
		width: 100px;
		border-radius: 50%;
	}
	
	.input{
		padding: 10px 0;
		width: 80vw;
		margin-left: 10vw;
		margin-right: 10vw;
	}
	.input .input-user input,
	.input .input-password input{
		width: 76vw;
		height: 33px;
		margin-top: 15px;
		border-radius: 5px;
		padding:0 2vw;
		border:none;
		opacity: 0.8;
	}
	.input .input-buttom button{
		width: 80vw;
		height: 33px;
		margin-top: 22px;
		border-radius: 5px;
		background-color: #26aae8;
		border:none;
		padding:0 5px;
		color: #FFF;
		font-size: 15px;
		letter-spacing: 0.125rem;
	}
	
	.wangji{
		width: 80vw;
		margin-left: 10vw;
		margin-right: 10vw;
		display: flex;
		justify-content: space-between;
	}
	.wangji p{
		color: #59a5cd;
		font-size: 11px;
	}
		
	
</style>
