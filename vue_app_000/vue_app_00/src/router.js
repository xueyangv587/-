import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import Home from "./components/weixin/Home.vue"
import App from "./components/App/App.vue"
import List from "./components/App/List.vue"
import Thome from "./components/tabbar/Thome.vue"
import NewsList from "./components/home/NewsList.vue"
import GoodList from "./components/goods/GoodList.vue"
import NewsInfo from "./components/home/NewsInfo.vue"
Vue.use(Router)
export default new Router({
  routes: [
    {path:'/Home',component:Home},
    // {path:'/',component:HelloContainer},
    // redirect  跳转
    {path:'/',redirect:"/thome"},
    {path:'/app',component:App},
    {path:'/list',component:List},
    {path:'/thome',component:Thome},
    {path:'/newslist',component:NewsList},
    {path:'/goodlist',component:GoodList},
    {path:'/newsinfo',component:NewsInfo}
  ]
})
