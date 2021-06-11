<template>
	<div>
		<goodsHeader :header="header"></goodsHeader>
		
		<div class="goods_class">
			<div class="target"
			v-for="(item,index) in filterByList"
			:key="index"
			:class="{'on':item.selected}"
			@click="handleSelect(index)">
				<p>{{item.text}}</p>
			</div>
		</div>

		<div class="goods_list">
		<div class="product_list" 
		@touchstart="touchStart($event)"
		@touchend="touchEnd($event)" >
			<div 
			class="product"
			v-for="(item,index) in goodsList"
			:key="index"
			@click="toDetail(item)">
				<img :src="item.img" alt="">
				<div class="name">{{item.name}}</div>
				<div class="info">
					<div class="price">
						<span>￥</span>
						{{item.price}}
					</div>
					<div class="slogan">
						{{item.slogan}}
						<span>人付款</span>
					</div>
				</div>
			</div>	
		</div>
		<div class="loading">{{loadingText}}</div>
		</div>

	</div>
</template>

<script>
	import goodsHeader from './goodsHeader.vue' 
	export default{
		name:"goodsList",
		data(){
			return{
				header:"",
				goodsList:[],
				filterby: "all", // 默认选择的tab
				loadingText: "正在加载....",
				page: 1,
				size: 6,
				startX:0,
				startY:0,
				endX:0,
				endY:0,
				filterByList: [{
						text: "全部",
						selected: true,
						filterby: "all"
					},
					{
						text: "口碑",
						selected: false,
						filterby: "public"
					},
					{
						text: "热门",
						selected: false,
						filterby: "hot"
					}
				]
			}
		},
		created() {
			this.header = this.$route.query.header;
			//console.log(this.header);
			this.getdata();

			
		},
		destroyed(){
        	window.removeEventListener('scroll', this.getScroll);
    	},
		mounted(){
			window.addEventListener('scroll', this.getScroll);
		},
		methods:{
			getScroll(){
				let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
				let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight; 
				if(parseInt(scrollTop+windowHeight) == parseInt(scrollHeight)){
				this.page++;
				this.getdata();
				//console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
					} 
			},
			touchStart(e){
				this.startX = e.touches[0].pageX;
				this.startY = e.touches[0].pageY;
				//console.log("X:"+this.startX+",Y:"+this.startY)
			},
			touchEnd(e){
				this.endX = e.changedTouches[0].pageX;
				this.endY = e.changedTouches[0].pageY;
				//console.log("MX:"+this.endX+",MY:"+this.endY)
			},
			handleSelect(index){
				this.filterByList[index].selected = true;
				// 其他的selected false
				for (let i = 0; i < this.filterByList.length; i++) {
					if (i != index) {
						this.filterByList[i].selected = false;
					}
				}

				// 数据请求
				this.filterby = this.filterByList[index].filterby;
				this.page = 1;
				this.loadingText = "加载中...";
				this.goodsList = [];
				this.getdata();
			},
			getdata(){
				//https://uniapp-interface.herokuapp.com/api/profiles/goodslist
				let url = 'https://uniapp-interface.herokuapp.com/api/profiles/goodslist/'+this.filterby+'/'+this.page+'/'+this.size;
				fetch(url).then(function(response){
					return response.json()
				})
				.then(myJson =>{
					if(myJson.data.length > 0){
						myJson.data.forEach(element => {
							this.goodsList.push(element)
						});
					}else{
						this.loadingText = "到底了...";
					}
				})
				.catch(error => console.error(error))
			},
			toDetail(goodsInfo){
				this.$router.push({ path: '/detail', query: { goodsInfo: goodsInfo }})
			}
		},
		components:{
			goodsHeader
		}
	}
</script>

<style scoped="scoped">
	.goods_class{
		width: 92%;
		padding: 40px 4% 0 4%;
		height: 35px;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		position: fixed;
		z-index: 9;
		background-color: #fff;
		border-bottom: solid 1upx #eee;
	}
	.goods_class .target{
		width: 20%;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #aaa;
	}
	.target.on{
		color: #555;
		border-bottom: 2px solid #f06c7a;
		font-weight: 600;
		font-size: 15px;
	}

	.product_list{
		width: 92%;
		padding: 76px 4% 0 4%;
		column-count: 2;
		column-gap: 1em;
	}
	.product_list .product{
		break-inside: avoid;
		border-radius: 10px;
		background-color: #fff;
		margin:0 0 8px 0;
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
	}
	.product_list .product img{
		width: 100%;
		height: auto;
		border-radius: 10px 10px 0 0;
	}
	.product_list .product .name{
		font-size: 15px;
		padding: 3px 4%;
	 	text-align: justify;   /*块级元素内文本的水平对齐方式 */
		display: -webkit-box;	/*三件套 */
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.product_list .product .info{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 5px 4% 5px 4%;
	}
	.product_list .product .info .price{
		color: #e65339;
		font-size: 30upx;
		font-weight: 600;
	}
	.product_list .product .info .slogan{
		color: #807c87;
		font-size: 12px;
	}

	.loading{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 25px;
		font-size: 12px;
		padding-bottom: 10px;
	}
</style>
