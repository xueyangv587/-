<template>
  <div class="app-swiper">
    <!-- 轮播图 -->
      <mt-swipe :auto="2000">
        <mt-swipe-item  v-for="item in list" :key="item.id" >
          <img :src="item.img_url" alt="">
        </mt-swipe-item>
      </mt-swipe>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:["list"]//接收父组件数据

}
// 1:父组件发送ajax请求返回图片列表
//  2:将列表传子组件
</script>

<style>
  .app-swiper .mint-swipe{
    height:200px;
  }
  .app-swiper .mint-swipe img{
    width:100%;
  }
</style>