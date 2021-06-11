<template>
    <div>
        <div class="header">
                <div class="back" @click="toback">
                  <i class="icon iconfont">&#xe646;</i>  
                </div>
                <div class="icon_cart" @click="toCart">
                    <i class="icon iconfont">&#xe6c1;</i>
                </div>
        </div>

        <div class="swiper">
            <mt-swipe class="mt-swipe">
                <mt-swipe-item 
                class="mt-swipe-item"
                v-for="(item,index) in goodsData.swiperList"
                :key="index">
                    <img :src="item.img" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        
        <div class="info">
            <div class="info_price">￥{{goodsInfo.price}}</div>
            <div class="info_name">{{goodsInfo.name}}</div>
        </div>

        <div class="select">
            <div class="row" @click="showSpace = true">
                <div class="text">选择规格</div>
                <div class="content">
                        <div class="goods_spec" v-for="(item,index) in goodsData.spec" :key="index"
                        :class="{'on':item == goodsInfo.spec}">
                            {{item}}
                        </div>
                </div>
                <div class="arrow"><span>></span></div>
            </div>
        </div>

        <Spec 
        @add="add" 
        @sub="sub"
        @hideSpec="hideSpec" 
        :showSpace="showSpace" 
        :goodsInfo="goodsInfo" 
        :goods_spec="goodsData.spec" 
        @setSelectSpec="setSelectSpec"
        ></Spec>

        <div class="footbar">
            <div class="left">
                <div class="box">
                    <div class="icon iconfont">&#xe64e;</div> 
                    <div class="text">分享</div>
                </div>
                <div class="box" @click="flag = !flag">
                    <div class="icon iconfont" v-if="flag">&#xe629;</div>
                    <div class="icon iconfont" v-else>&#xe630;</div>
                    <div class="text">{{flag?'':'已'}}收藏</div>
                </div>
            </div>
            <div class="right">
                <div 
                @click="joinCart"  
                class="joincart">
                加入购物车
                </div>
                <div class="buy">立即购买</div>
            </div>
        </div>

    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import goodsHeaderVue from '../goods/goodsHeader.vue';
import Spec from './spec.vue'
export default {
    data(){
     return{
            flag:true,
            goodsInfo:[],   //接受goodslist页面传来的商品信息，通过push路由传递。
            goodsData:[],
            showSpace:false,
        }
    },
    created(){
        this.goodsInfo = this.$route.query.goodsInfo;
        //console.log(this.goodsInfo);
        this.getdata();

    },
    methods:{
        showToast(){
            Toast({
				  message: "添加成功",
				  duration: 800
				});
        },
        toCart(){
            this.$router.push({path:'/cart'});
        },
        toback(){
            this.$router.go(-1);
        },
        getdata(){
            fetch('https://uniapp-interface.herokuapp.com/api/profiles/goods')
            .then(Response => {
                return Response.json()
            })
            .then(myJson => {
                //console.log(myJson.data);
                this.goodsData = myJson.data;
            })
            .catch(error => {
                console.error(error)
            })
        },
        setSelectSpec(item){
            this.goodsInfo.spec = item;
        },
        hideSpec(){
            this.showSpace = false;
        },
        add(){
			this.goodsInfo.number++;
			},
		sub(){
			if(this.goodsInfo.number <= 1){
			    return;
			}
			this.goodsInfo.number--;
            },
        joinCart(){
            let cartList = localStorage.getItem('goodsList');  
            //console.log(cartList);
            let isExist = false;
            if(cartList){
                let jsonstr = JSON.parse(cartList.slice(1,cartList.length));
                let goodsList = jsonstr.goodsList;
                for(let goods in goodsList){
                    if(goodsList[goods].goods_id == this.goodsInfo.goods_id && goodsList[goods].spec == this.goodsInfo.spec){
								// 如果存在  修改商品数量
								goodsList[goods].number += Number(this.goodsInfo.number);
								isExist = true ;
							}
                }
                if(!isExist){
                    goodsList.push(this.goodsInfo);
                }
                localStorage.setItem('goodsList',"'"+JSON.stringify(jsonstr));
            }else{
                let joincart = {"goodsList":[this.goodsInfo]};
                localStorage.setItem('goodsList',"'"+JSON.stringify(joincart));
                //console.log("11");
            }

            this.showToast();
        }    
    },
    components:{
        Spec
    }
}
</script>

<style scoped>
    .header{
        position: fixed;
        top: 0;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* background-color:#f5f5f5 ; */
        z-index: 10;
    }
    .back,.icon_cart{
        width: 30px;
        height: 30px;
        margin: 0 13px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        display: flex;
        vertical-align: middle;
        text-align: center;
    }
    i{
        margin: auto;
        font-weight: 200;
        color: seashell;
    }
    
    .swiper,.mt-swipe{
        width: 100%;
		height: 60vw;
    }
    .swiper .mt-swipe .mt-swipe-item img{
        width: 100%;
        height: auto;
    }

    .info{
        width: 92%;
        margin: 7px 2%;
        padding: 5px 2%;
        background-color: rgba(252, 248, 246, 0.904);
        border-radius: 10px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    }
    .info .info_price{
        font-size: 18px;
		font-weight: 600;
		color: #f47925;
    }
    .info .info_name{
        letter-spacing: 1px;
        font-size: 14px;
        font-weight: 600;
    }

    .select{
        width: 92%;
        height: 40px;
        margin: 7px 2%;
        padding: 5px 2%;
        background-color: rgba(252, 248, 246, 0.904);
        border-radius: 10px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    }
    .select .row{
        width: 100%;
        height: 40px;
		display: flex;
		align-items: center;
    }
    .select .row .text{
        font-size: 14px;
		color: #a2a2a2;
		margin-right: 10px;
    }
    .select .row .content{
        font-size: 14px;
		display: flex;
    }
    .select .row .content .goods_spec{
       background-color: #f6f6f6;
		padding: 5px;
	    color: #999;
		margin-right: 5px;
		font-size: 10px;
		border-radius: 3px;
    }
    .select .row .content .goods_spec.on{
        border: solid 1px #f47952;
    }
    .select .row .arrow{
        position: absolute;
		right: 4%;
        color: #999;
        font-weight: 600;
    }

    .footbar{
        position: fixed;
        bottom: 0px;
        width: 92%;
        padding: 3px 4%;
        height: 50px;
		border-top: solid 1px #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
    }
    .footbar .left{
        display: flex;
    }
    .footbar .left .box{
        width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
    }
    .footbar .left .box .icon{
        font-size: 21px;
		color: #828282;
    }
    .footbar .left .box .text{
        font-size: 11px;
		color: #666;
    }
    .footbar .right{
        height: 40px;
        display: flex;
    }
    .footbar .right .joincart,
    .footbar .right .buy{
        height: 40px;
		padding: 0 20px;
		color: #fff;
		display: flex;
		align-items: center;
		font-size: 14px;
    }
    .joincart {
		background-color: #f0b46c;
	}

	.buy {
		background-color: #f06c7a;
	}
</style>