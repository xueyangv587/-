<template>
 <div class="app-container">
    <!-- 添加公共组件 header -->
     <mt-header fixed  title="电脑商城"></mt-header>
    <!-- 占位符用来显示其他组 -->
    <router-view></router-view>
    <!-- 添加公共组件 tabbar -->
     <!-- tabbar -->
          <!-- <mt-tabbar v-model="selected">
              <mt-tab-item id="tab1">
                  <img slot="icon" src="img/首页.png" alt="">
                  首页
              </mt-tab-item>
              <mt-tab-item id="tab2">
                  <img slot="icon" src="img/会员.png" alt="">
                  会员
              </mt-tab-item>
              <mt-tab-item id="tab3">
                  <img slot="icon" src="img/购物车.png" alt="">
                  购物车
              </mt-tab-item>
              <mt-tab-item id="tab4">
                  <img slot="icon" src="img/搜索.png" alt="">
                  搜索
              </mt-tab-item>
          </mt-tabbar> -->
       <nav class="mui-bar mui-bar-tab">
          <router-link to="/thome" href="#tabbar" class="mui-tab-item mui-active">
             <span class="mui-icon mui-icon-home"></span>
             <span class="mui-tab-label">首页</span>
          </router-link>
           <a href="#tabbar-with-chat" class="mui-tab-item ">
             <span class="mui-icon mui-icon-contact"></span>
             <span class="mui-tab-label">会员</span>
          </a>
          <a href="#tabbar-with-contact" class="mui-tab-item ">
             <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                <span class="mui-badge">0</span>
             </span>
             <span class="mui-tab-label">购物车</span>
          </a>
           <a href="#tabbar-with-map" class="mui-tab-item ">
             <span class="mui-icon mui-icon-search"></span>
             <span class="mui-tab-label">搜索</span>
          </a>
       </nav>
 </div>
</template>
<script>
export default {
  data(){
    return {
      selected:"tab1"
    }
  },
}
</script>

<style>
   .app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}
</style>
