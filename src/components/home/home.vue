<template>
	<div>
		
	<pageHeader></pageHeader>	
	
	<div class="swiper">
		<div class="swiper-box">
		<mt-swipe 
		class="mt-swipe" 
		:show-indicators="false"
		 @change="swiperChange"
		 >
		  <mt-swipe-item v-for="item in swiperList" :key="item.id">	    
			  <img :src="item.img" class="img"/>
		  </mt-swipe-item>
		</mt-swipe>	
			<div class="indicator">
				<div 
				:class="{'on':currentSwiper >= index}"
				class="dots" 
				v-for="(item,index) in swiperList" 
				:key="index"
				></div>
			</div>
		</div>	
	</div>
	
	<div class="category-list">
		<div 
		class="category"
		v-for="(item,index) in categoryList"
		:key="index"
		>
		<div class="img">
			<img :src="item.img" @click="toGoodsList(item.name)"/>
		</div>
		<p class="text">{{item.name}}</p>
		</div>
	</div>
	
	<div class="banner" v-if="promotion.length > 0">
		<img src="/static/img/category/banner.jpg" />
	</div>
	
	<div class="promotion" v-if="promotion.length > 0">
		<p class="text">优惠活动</p>
		<div class="list">
			<div 
			@click="handlePromotion(item)"
			class="column" 
			v-for="(item,index) in promotion"
			:key="index"
			>
				<div class="top">
					<p class="title">{{item.title}}</p>
				</div>
				<div class="left">
					<p class="ad">{{item.ad}}</p>
					<p class="into">点击进入</p>
				</div>
				<div class="right">
					<img :src="item.img" />
				</div>
			</div>
		</div>
	</div>
	
	
	</div>		
</template>

<script>
	import { Toast } from 'mint-ui';
	import pageHeader from './homeHeader.vue'   //引入时前面一定要加 ./表示当前  ../表示退到上级
	export default{
		data(){
			return{
				swiperList:[],
				categoryList: [],
				promotion: [],
				currentSwiper: 0
			}
		},
		created(){
			this.getdata();
		},
		methods:{
			getdata(){
				fetch('https://uniapp-interface.herokuapp.com/api/profiles/mall_list')
				  .then(function(response) {
				     return response.json()
				  })  
				  .then(myJson => {
					//console.log(myJson);
					this.swiperList = myJson.data.swiperList;
					this.categoryList = myJson.data.categoryList;
					this.promotion = myJson.data.promotion;
				})
				.catch(error => console.error(error));
			},
			swiperChange(index){
				//console.log(index);
				this.currentSwiper = index;
			},
			handlePromotion(item){
				Toast({
				  message: item.title,
				  duration: 800
				});
			},
			toGoodsList(item){
				 this.$router.push({ path: '/goodsList', query: { header: item }})
			}
		},
		components:{
			pageHeader,
		},
		
	}
</script>

<style scoped="scoped">
	.swiper{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.swiper .swiper-box{
		width: 92%;
		height: 35vw;
		overflow: hidden;
		border-radius: 7px;
		position: relative;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
	}
	/* .swiper .swiper-box .mt-swipe{
		width: 100%;
		height: 35vw; 
	} */
	.swiper .swiper-box .mt-swipe .img{
		width: 100%;
		height: 35vw;
	}
	
	.indicator{
		position: absolute;
		width: 90px;
		height: 3px;
		bottom: 10px;
		left: 15px;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 3px;
		overflow: hidden;
		display: flex;
	}
	.dots{
		width: 33.3vw;
	}
	
	.on{
		transition: all 0.3s ease-out;
		background-color: rgba(255, 255, 255, 1);
	}
	
	.category-list{
		width: 92%;
		margin: 0 4%;
		display: flex;
		/* justify-content: space-between; */
		flex-wrap: wrap;
	}
	.category{
		width: 25%;
		margin-top: 15px;
		display: flex;
		flex-wrap: wrap;
	}
	.category-list .category .img{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.category-list .category .img img{
		width: 11vw;
		height: 11vw;
	}
	.category-list .category .text{
		width: 100%;
		margin-top: 4px;
		font-size: 12px;
		display: flex;
		justify-content: center;
	}
	
	.banner{
		width: 92%;
		margin: 20px 4%;
	}
	.banner img{
		width: 100%;
		height: 35vw;
		border-radius: 2px;
		box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
	}
	
	.promotion{
		width: 92%;
		margin: 5px 4% 70px 4%;
	}
	.promotion .text{
		width: 100%;
		height: 30px;
		font-size: 17px;
		font-weight: 600;
		margin: 5px;
	}
	.promotion .list{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.promotion .list .column{
		width: 43%;
		padding: 7px 3%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		background-color: #ebf9f9;
	}
	.promotion .list .column .top{
		width: 100%;
		height: 20px;
		margin-bottom: 3px;
	}
	.promotion .list .column .left{
		width: 50%;
		height: 18.86vw;
	}
	.promotion .list .column .left .ad{
		font-size: 11px;
		color: #acb0b0;
	}
	.promotion .list .column .left .into{
		font-size: 12px;
		color: #aaa;
		margin-top: 12px;
	}
	.promotion .list .column .right{
		width: 50%;
		height: 18vw;
	}
	.promotion .list .column .right img{
		width: 100%;
		height: 18vw;
	}
</style>
