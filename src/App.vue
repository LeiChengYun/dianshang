<template>
  <div id="app"> 
	  <keep-alive>
		  <router-view v-if="$route.meta.keepAlive"/>
	  </keep-alive>
		<router-view v-if="!$route.meta.keepAlive"/>

	<keep-alive>
		<tabbar v-if='$route.meta.showTab'></tabbar>
	</keep-alive>
	
  </div>
</template>

<script>
		import tabbar from './components/footbar/Tabbar'
export default {
  name: 'App',
	components:{
		tabbar,
	}
}
</script>

<style>
	/*每个页面公共css */
	@import url("assets/css/base.css");
	/* 本地引入icon图标 */
	@import "/assets/iconfont/iconfont.css";
	/* 引入icon图标 */
	/* @import "//at.alicdn.com/t/font_921935_ql8haxx1xzn.css"; */
	#app{
		position: relative;
		background-color: #fff;
	}

</style>
