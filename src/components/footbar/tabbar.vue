<template>
	<mt-tabbar v-model="selected" :fixed=true>
	  <mt-tab-item id="home">
	    <i slot="icon" class="icon iconfont" >&#xe6a5;</i>
	    <div class="text">主页</div>
	  </mt-tab-item>
	  <mt-tab-item id="category">
	   <i slot="icon" class="icon iconfont" >&#xe600;</i>
	    <div class="text">分类</div>
	  </mt-tab-item>
	  <mt-tab-item id="cart">
	     <i slot="icon" class="icon iconfont" >&#xe6c1;</i>
	    <div class="text">订单</div>
	  </mt-tab-item>
	  <mt-tab-item id="user">
	    <i slot="icon" class="icon iconfont" >&#xe63f;</i>
	    <div class="text">个人</div>
	  </mt-tab-item>
	</mt-tabbar>
</template>

<script>
	export default{
		name:"Tabbar",
		data(){
			return{
				selected:"home"
			}
		},
		watch:{
		    selected: function(val,oldval){
		      this.$router.push({path:val})
		    }
		},
	}
</script>

<style scoped="scoped">
	
	.iconfont{
	  font-size: 22px;
	}
	.text{
	  font-size: 10px;
	}
</style>
