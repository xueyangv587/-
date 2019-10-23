import Vue from 'vue'
import App from './App.vue'
import router from './router'
//1:引入mint-ui样式文件
import'mint-ui/lib/style.css'

Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
//3:引入mint-ui 组件Header 引入轮播组件
import {Header,Swipe,SwipeItem,Tabbar,TabItem,Button} from "mint-ui"
//4:注册header组件
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Tabbar.name,Tabbar);
Vue.component(TabItem.name,TabItem);
Vue.component(Button.name,Button);
//5:引入axios库
import axios from "axios"
//6:配置跨域访问保存session
axios.defaults.withCredentials=true;
//7:将axios库配置Vue实例对象中
Vue.prototype.axios=axios;
//8:main.js创建日期过滤器
Vue.filter("datatimeFilter",function(val){
  //1:创建日期对象
  var date=new Date(val)
  //2:获取年月日时分秒
  var y=date.getFullYear(); //年
  var m=date.getMonth()+1; //月
  var d=date.getDate(); //日
  var h=date.getHours(); //时
  var mi=date.getMinutes(); //分
  var s=date.getSeconds(); //秒
  //3:返回字符串 y-m-d h:mi:s
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
});
Vue.filter("datatime",function(val){
  //1:创建日期对象
  var date=new Date(val)
  //2:获取年月日时分秒
  var y=date.getFullYear(); //年
  var m=date.getMonth()+1; //月
  var d=date.getDate(); //日 
  //3:返回字符串 y-m-d h:mi:s
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  return `${y}-${m}-${d}`;
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
