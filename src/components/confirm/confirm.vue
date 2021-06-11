<template>
    <div>
        <div class="header">
            <div class="back" @click="toBack">
                <i class="icon iconfont">&#xe646;</i>
            </div>	
            <div class="title">
                <div><span>确认订单</span></div>
            </div>
	    </div>

        <div class="buy_list">
            <div class="row" v-for="(item,index) in goodsList" :key="index">
                <div class="goods_info">
                    <div class="img">
                        <img :src="item.img">
                    </div>
                    <div class="info">
                        <div class="title">{{item.name}}</div>
                        <div class="spec">选择:{{item.spec}} 数量:{{item.number}}</div>
                        <div class="price_number">
                            <div class="price">￥{{item.price * item.number}}</div>
                        </div>
                    </div>
                </div>
            </div>
	    </div>

        <div class="detail">
		<div class="row">
			<div class="amount">商品金额</div>
			<div class="content">￥{{goodsPrice}}</div>
		</div>
		<div class="row">
			<div class="amount">运费</div>
			<div class="content">￥{{freight}}</div>
		</div>
	    </div>

        <div class="footer">
		<div class="settlement">
			<div class="sum">
                合计: 
                <div class="money">￥{{sumPrice}}</div>
			</div>
			<div class="btn">提交订单</div>
		</div>
	</div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            goodsList:[],
            goodsPrice: 0.0, // 商品金额
			sumPrice: 0.0, // 用户支付金额
			freight: 12.0 // 运费
        }
    },
    created(){
        this.goodsList = this.$route.query.selected;
        //console.log(this.goodsList);

        for (let i = 0; i < this.goodsList.length; i++) {
                this.goodsPrice = this.goodsPrice + (this.goodsList[i].number * this.goodsList[i].price);
            }
            
            // 用户支付的金额
        this.sumPrice = this.goodsPrice + this.freight;
    },
    methods:{
			toBack(){
				 this.$router.go(-1);
            },
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

    .buy_list{
        width: 86%;
		padding: 5px 3%;
		margin: 55px auto 10px auto;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
        
    }
    .buy_list .row{
        margin: 15px 0;
    }
    .buy_list .row .goods_info{
        width: 100%;
		display: flex;
    }
    .buy_list .row .goods_info .img{
        width: 22vw;
        height: 22vw;
        border-radius: 5px;
        overflow: hidden;
        flex-shrink: 0;
        margin-right: 5px;
    }
    .buy_list .row .goods_info .img img{
        width: 22vw;
		height: 22vw;
    }
    .buy_list .row .goods_info .info{
        width: 100%;
        height: 22vw;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        position: relative;
    }
    .buy_list .row .goods_info .info .title{
        width: 100%;
        font-size: 12px;
        display: -webkit-box;
        display: -moz-box;
        -webkit-box-orient: vertical;
        -moz-box-orient:vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .buy_list .row .goods_info .info .spec{
        font-size: 11px;
        background-color: #f3f3f3;
        color: #a7a7a7;
        height: 20px;
        display: flex;
        align-items: center;
        padding: 0 5px;
        border-radius: 10px;
        margin-bottom: 10vw;
    }
    .buy_list .row .goods_info .info .price_number{
        position: absolute;
        width: 100%;
        bottom: 0px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 20px;
    }
    .buy_list .row .goods_info .info .price_number .price{
        color: #f06c7a;
    }

    .detail{
        width: 86%;
		padding: 5px 3%;
		margin: 15px auto 10px auto;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
    }
    .detail .row{
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .detail .row .amount{
        font-size: 14px;
    }
    .detail .row .content{
        font-size: 13px;
		color: #f06c7a;
    }

    .footer{
        width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 50px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: fixed;
		bottom: 0px;
		z-index: 5;

    }
    .footer .settlement{
        width: 80%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .footer .settlement .sum{
        width: 50%;
        margin-right: 5px;
        display: flex;
        justify-content: flex-end;
    }
    .footer .settlement .sum .money{
        font-weight: 600;
    }
    .footer .settlement .btn{
        padding: 0 15px;
        height: 30px;
        background-color: #f06c7a;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        border-radius: 20px;
    }
</style>