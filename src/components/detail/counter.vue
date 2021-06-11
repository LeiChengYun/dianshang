<template>
    <div class="counter">
        <div class="sub" @click.stop="sub">
            <div><span>-</span></div>
        </div>
        <div class="input">
            <input disabled="disabled" type="text" class="number" v-model="goodsInfo.number">
        </div>
        <div class="add" @click.stop="add">
            <div><span>+</span></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        sub(){
            this.$emit("sub");
        },
        add(){
            this.$emit("add");
        }
    },
    props:[
        "goodsInfo"
    ]
    
}
</script>

<style scoped>
    .counter{
        display: flex;
		justify-content: center;
		align-items: center;
    }
    .input{
        width: 40px;
		height: 30px;
		margin: 0 5px;
    }
    .input input{
        width: 40px;
		height: 30px;
        display: flex;
        vertical-align: middle;
        text-align: center;
        border: none;
        background-color: #f3f3f3;

    }
    .sub,.add{
        width: 30px;
		height: 30px;
		background-color: #f3f3f3;
		border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
   
</style>