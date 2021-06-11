<template>
	<div>
		<pageHeader/>
		
		<div class="category-list">
			<div class="left">
				<div 
				class="row"
				@click="handleCategory(index)"
				:class="{'on':showCategoryIndex == index}"
				v-for="(item,index) in categoryList"
				:key="index">
					<div class="text">
						<p class="flag"></p>
						{{item.title}}
					</div>
				</div>
			</div>
			
			<div class="right">
				<div class="category"
				v-for="(item,index) in categoryList"
				:key="index"
				v-show="index==showCategoryIndex">
					<div class="banner">
						<img :src="item.banner" />
					</div>
					<div class="list">
						<div class="box"
						v-for="(category,index) in item.list"
						:key="index"
						@click="handleCategoryList(category.name)">
							<img :src="'/static/img/category/list/' + category.img" />
							<p class="text">{{category.name}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import pageHeader from '../home/homeHeader.vue'
	export default{
		data(){
			return{
				categoryList: [],
				showCategoryIndex: 0
			}
		},
		created(){
			this.getdata();
		},
		methods:{
			handleCategoryList(category){
				this.$router.push({ path: '/goodsList', query: { header: category }})
			},
			getdata(){
				fetch('https://uniapp-interface.herokuapp.com/api/profiles/category')
				  .then(function(response) {
				     return response.json()
				  })  
				  .then(myJson => {
					//console.log(myJson);
					this.categoryList = myJson.data;
					
				})
				.catch(error => console.error(error));
			},
			handleCategory(index){
				this.showCategoryIndex = index;
			}
		},
		components:{
			pageHeader
		}
	}
</script>

<style scoped="scoped">
	.category-list{
		width: 100%;
		background-color: #fff;
		display: flex;
	}
	.category-list .left{
		width: 24%;
		background-color: #f2f2f2;
	}
	.category-list .left .row{
		width: 100%;
		height: 45px;
		display: flex;
		align-items: center;
	}
	.category-list .left .row .text{
		text-align: center;
		width: 100%;
		position: relative;
		color: #3c3c3c;
	}
	.category-list .left .row .text .flag{
		position: absolute;
	}
	.row.on{
		height: 50px;
		background-color: #fff;
	}
	.row.on .text{
		font-size: 15px;
		font-weight: 600;
	}
	.row.on .text .flag{
		width: 5px;
		height: 100%;
		background-color: #f06c7a;
	}
	
	.category-list .right{
		position: absolute;
		width: 76%;
		left: 24%;
	}
	.category-list .right .category{
		width: 94%;
		padding: 10px 3%;
	}
	.category-list .right .category .banner{
		width: 100%;
		height: 28vw;
		border-radius: 5px;
		box-shadow: 0 3px 10px rgba(0,0,0,0.2);
	}
	.category-list .right .category .banner img{
		width: 100%;
		height: 100%;
	}
	.category-list .right .category .list{
		margin-top: 20px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.category-list .right .category .list .box{
		width: 33.3%;
		text-align: center;
		margin-bottom: 15px;
	}
	.category-list .right .category .list .box img{
		width: 60%;
		height: auto;
	}
	.category-list .right .category .list .box .text{
		margin-top: 3px;
		font-size: 13px;
	}
</style>
