<template>
<div v-show="showSpace">
    <div class="popup" @click="hideSpec"></div>
    <div>
        <div class="layer">
            <div class="content">
                <div class="text">选择规格:</div>
                <div class="spec">
                    <div class="spec_list" v-for="(item,index) in goods_spec" :key="index"
                    :class="{'on':item == goodsInfo.spec}"
                    @click.stop="handleSelectSpec(item)">
                        {{item}}
                    </div>
                </div>
                <div class="amount" >
                    <div class="amount_text">数量:</div>
                    <Counter @sub="sub" @add="add" :goodsInfo="goodsInfo" />
                </div>
            </div>
            <div class="btn" @click="hideSpec">
                <p class="button">确定</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import Counter from './counter.vue'
export default {
    data(){
        return{
        }
    },
    methods:{
        //本函数触发父组件对应函数改变goodsInfo.spec值-规格，进而再传导到该组件改变样式
        //在父组件，在本组件标签上绑定 @setSelectSpec="setSelectSpec（在父组件定义的函数，名字可以另起）"
        handleSelectSpec(item){         
            this.$emit("setSelectSpec",item)
        },
        //由父组件控制该组件隐藏或现实，触发函数，改变父组detail件中定义的值，进而改变自己的状态
        hideSpec() {
			this.$emit("hideSpec");
            },
        sub(){
			this.$emit("sub");
			},
		add(){
			this.$emit("add");
			}
    },
    props:[
        "goods_spec",
        "goodsInfo",
        "showSpace"
    ],
    components:{
        Counter
    }
    
}
</script>

<style scoped>
    .popup{
        position: fixed;
		top: 0;
        width: 100%;
		height: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 20;
    }
    .layer{
        position: fixed;
		z-index: 20;
		bottom: 0;
		width: 92%;
		padding: 0 4%;
		height: 50%;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
            
    }
    .layer .content{
        height: 40px;
        width: 100%;
    }
    .layer .content .text{
        font-size: 15px;
        padding: 10px 0;
        font-weight: 600;
    }
    .layer .content .spec{
        display: flex;
    }
    .layer .content .spec .spec_list{
        font-size: 28upx;
		padding: 3px 10px;
		border-radius: 4px;
		margin: 0 15px 10px 0;
		background-color: #f6f6f6;
    }
    .layer .content .spec .spec_list.on{
        padding: 2px 9px;
		border: solid 1px #f47925;
    }
    .layer .btn{
        position: fixed;
        bottom: 0;
        width: 92%;
        height: 40px;
        margin-bottom: 10px;
		border-radius: 20px;
		color: #fff;
	    display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f47952;
		font-size: 14px;                                     
    }
    .layer .content .amount{
        margin-top: 10px;
	    border-top: solid 1px #aaa;
	    display: flex;
		justify-content: space-between;
		align-items: center;
        padding: 18px 0;
    }
    .layer .content .amount .amount_text{
        font-size: 14px;
        font-weight: 600;
    }
</style>