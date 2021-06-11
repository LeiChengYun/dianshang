import Vue from 'vue'
import Router from 'vue-router'
import Cart from '../components/cart/cart.vue'
import Home from '../components/home/home.vue'
import User from '../components/user/user.vue'
import Category from '../components/category/category.vue'
import GoodsList from '../components/goods/goodsList.vue'
import Detail from '../components/detail/detail.vue'
import Confirm from '../components/confirm/confirm.vue'
import Login from '../components/login/login.vue'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
  {path:'/',redirect:'/Home'},
	{path:'/home',component:Home,meta:{showTab:true,keepAlive: true}},
	{path:'/user',component:User,meta:{showTab:true,keepAlive: false}},
	{path:'/category',component:Category,meta:{showTab:true,keepAlive: true}},
	{path:'/cart',component:Cart,meta:{showTab:true,keepAlive: false}},
	{path:'/goodsList',component:GoodsList,	meta:{showTab:false,keepAlive: false}},
	{path:'/detail',component:Detail,meta:{showTab:false,keepAlive: false}},
	{path:'/confirm',component:Confirm,meta:{showTab:false,keepAlive: false}},
	{path:'/login',component:Login,meta:{showTab:false,keepAlive:false}}
  ]
})
