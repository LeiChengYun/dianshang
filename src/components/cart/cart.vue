<template>
	<div>
		<div class="header">
            <div class="title">
                <div><span>购物车</span></div>
            </div>
	    </div>
		
		<div v-if="(goodsList.goodsList).length == 0" class="kongk">
			<div class="kongkk">
				<i class="icon iconfont">&#xe671;</i>
				<p class="kong-title">空空如也~</p>
			</div>
		</div>

		<div class="goods_list">
			<div class="row" v-for="(item,index) in goodsList.goodsList" :key="index">
				<div class="production">
					<div class="container">
						<div class="check_box" @click="handleCheckbox(item)">
							<div :class="{'on':item.select}"></div>
						</div>
					</div>

					<div class="goods_info">
						<div class="img">
							<img :src="item.img">
						</div>
						<div class="info">
							<div class="title">{{item.name}}</div>
							<div class="spec">{{item.spec}}</div>
							<div class="price_number">
								<div class="price">￥{{item.price}}</div>
								<Counter :goodsInfo="item" @add="add(item)" @sub="sub(item)"/>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

	<div class="footer">
		<div class="container">
			<div class="checkbox" @click="handleSelectedAll">
				<div :class="{'on':isAllSelected}"></div>
			</div>
			<div class="text"><span>全选</span></div>
		</div>
		<div class="delBtn" @click="handleMulDelete" v-if="selectedList.length > 0">删除</div>
		<div class="settlement">
			<div class="sum">
				合计：
				<div class="money">￥{{sumPrice}}</div>
			</div>
			<div class="btn" @click="handleConfirm">结算{{selectedList.length}}</div>
		</div>
	</div>
	</div>
</template>

<script>
import Counter from '../detail/counter.vue'
export default{
	data(){
		return{
			goodsList:[],
			isAllSelected: false,
			selectedList:[],
			sumPrice: '0.00'
		}
	},
	created(){
		let cartList = localStorage.getItem('goodsList');
		let jsonstr = JSON.parse(cartList.slice(1,cartList.length));
		for(let goods in jsonstr.goodsList){
			//给从localStorage取出来数组添加select属性，并赋值为false
			jsonstr.goodsList[goods].select = false;
		}
		this.goodsList = jsonstr;
		//console.log(this.goodsList);
	},
	methods:{
		handleSelectedAll(){//全选
			if(this.goodsList.goodsList.length != 0){
				this.isAllSelected = !this.isAllSelected;
			
			let arr = [];
				this.goodsList.goodsList.forEach((item,i) => {
					item.select = this.isAllSelected;
					arr.push(item);
				})
			
			this.selectedList =	this.isAllSelected ? arr : [];

			this.sum();

			}
		},
		handleMulDelete(){//while循环删除selectedList里的数
			 while(this.selectedList.length > 0){
					let jsonstr = this.goodsList;
					jsonstr.goodsList.forEach((element,index) =>{
						//console.log(element.goods_id);
						if(element.goods_id == this.selectedList[0].goods_id && element.spec == this.selectedList[0].spec){
							//这一步this.goodsList直接更新了?这里this.goodsList只是赋值给jsonstr而已
							jsonstr.goodsList.splice(index,1); 
							//更新所选商品数组
							this.selectedList.splice(this.selectedList.indexOf(this.selectedList[0]),1);
						}
						//重新存储local数据
						localStorage.setItem('goodsList',"'"+JSON.stringify(jsonstr));
					})
			 }
			
			// 如果全部删除后，则取消全选状态
			 this.isAllSelected = this.goodsList.length>0? this.isAllSelected : false;

			 this.sum();
			
			//console.log(this.selectedList);
			//console.log(this.goodsList);
			
		},
		handleCheckbox(item){
			//单选
			item.select = !item.select;
			// 条件: 数组中是否包含该元素
			let isExist = this.selectedList.indexOf(item);
			if(isExist > -1){
				this.selectedList.splice(isExist,1);
			}else {
				// push 数组里
				this.selectedList.push(item);
			}
			
			// 全选状态 用户逐渐选上所有，然后全选按钮变化颜色
			if(this.selectedList.length == this.goodsList.goodsList.length){
				this.isAllSelected = true;
			}else {
				this.isAllSelected = false;
			}

			this.sum();

			//console.log(this.selectedList);
		},
		add(item){//增加数量
				item.number++;
				
				localStorage.setItem('goodsList',"'"+JSON.stringify(this.goodsList));

				this.sum();

			},
		sub(item){//减少数量
				if(item.number <= 1){
					return;
				}
				item.number--;
				
				localStorage.setItem('goodsList',"'"+JSON.stringify(this.goodsList));

				this.sum();

			},
		sum(){// 合计总价
				this.sumPrice = 0;
				this.goodsList.goodsList.forEach((item,i) => {
					if(item.select){
						this.sumPrice = this.sumPrice + (item.number * item.price)
					}
				})
				this.sumPrice  = this.sumPrice.toFixed(2);
			},
		handleConfirm(){
			//跳转到确认订单页面
			if(this.selectedList.length > 0){
				this.$router.push({path:'/confirm',query:{selected:this.selectedList}});
			}
		}			
	},
	components:{
		Counter
	}
}
</script>

<style scoped>
	.header{
		width: 100%;
		height: 40px;
		background-color: #f5f5f5;
		display: flex;
		position: fixed;
		top: 0;
        z-index: 20;
	}
	.title{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}


	.goods_list{
		width:100%;
		margin-top: 50px;
	}
	.goods_list .row{
		width: calc(92%);
		height: calc(22vw + 20px);
		margin: 10px auto;
		display: flex;
		align-items: center;
		border-radius: 7px;
		box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
		border: 0;
		position: relative;
		overflow: hidden;
	}
	.goods_list .row .production{
		display: flex;
		align-items: center;
		background-color: #fff;
		position: absolute;
		
	}
	.goods_list .row .production .container{
		height: 22vw;
		display: flex;
		align-items: center;
		margin:0 10px;
	}
	.goods_list .row .production .container .check_box{
		width: 17px;
		height: 17px;
		border-radius: 100%;
		border: solid 1px #f06c7a;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.goods_list .row .production .container .check_box .on{
		width: 11px;
		height: 11px;
		border-radius: 100%;
		background-color: #f06c7a;
	}
	.goods_list .row .production .goods_info{
		width: 100%;
		display: flex;
		padding-right: 5px;
	}
	.goods_list .row .production .goods_info .img{
		width: 22vw;
		height: 22vw;
		border-radius: 5px;
		overflow: hidden;
		flex-shrink: 0;
		margin-right: 5px;
	}
	.goods_list .row .production .goods_info .img img{
		width: 22vw;
		height: 22vw;
	}
	.goods_list .row .production .goods_info .info{
		width: 100%;
		height: 22vw;
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		position: relative;
	}
	.goods_list .row .production .goods_info .info .title{
		width: 100%;
		font-size: 12px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.goods_list .row .production .goods_info .info .spec{
		font-size: 10px;
		background-color: #f3f3f3;
		color: #a7a7a7;
		height: 15px;
		display: flex;
		align-items: center;
		padding: 0 5px;
		border-radius: 7px;
		margin-bottom: 20vw;
	}
	.goods_list .row .production .goods_info .info .price_number{
		position: absolute;
		width: 100%;
		bottom: 0px;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		font-size: 14px;
		height: 30px;
	}

	.footer{
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		position: fixed;
		bottom: 52px;
		z-index: 5;
	}
	.footer .container{
		display: flex;
		align-items: center;
	}
	.footer .container .checkbox{
		width: 17px;
		height: 17px;
		border-radius: 100%;
		border: solid 1px #f06c7a;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.footer .container .checkbox .on{
		width: 11px;
		height: 11px;
		border-radius: 100%;
		background-color: #f06c7a;
	}
	.footer .container .text{
		font-size: 12px;
		margin-left: 5px;
		white-space: nowrap;
	}
	.footer .delBtn{
		border: solid 1px #f06c7a;
		color: #f06c7a;
		padding: 0 15px;
		height: 17px;
		border-radius: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		white-space: nowrap;
		font-size: 12px;
	}
	.footer .settlement{
		width: 60%;
		display: flex;
		justify-content: flex-end;
		align-items: center;

	}
	.footer .settlement .sum{
		width: 50%;
		font-size: 14px;
		margin-right: 5px;
		display: flex;
		justify-content: flex-end;
		white-space: nowrap;
	}
	.footer .settlement .sum .money{
		font-weight: 600;
	}
	.footer .settlement .btn{
		padding: 0 15px;
		height: 25px;
		background-color: #f06c7a;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 15px;
	}
	
	.kongk{
		height: 89vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;	
	}
	.kongk .kongkk{
		
	}
	.kongk .kongkk i{
		font-size: 70px;
		color: #d0d0d0;
	}
	.kongk .kongkk p{
		text-align: center;
		font-size: 12px;
	}
</style>
