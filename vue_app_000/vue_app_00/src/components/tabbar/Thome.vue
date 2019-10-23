<template>
    <div class="app">
     
      <!-- 轮播图 -->
      <mt-swipe>
        <mt-swipe-item v-for="item in list" :key="item.id">
          <img :src="item.img_url" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <!-- 九宫格 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
						<li
							class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
							<router-link to="/newslist"><img src="../../img/menu1.png" alt="">
								<div class="mui-media-body">新闻资讯</div>
						</router-link>
						</li>
						<li
							class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
							<router-link to="/goodlist"><img src="../../img/menu3.png" alt="">
								<div class="mui-media-body">商品</div>
						</router-link>
						</li>
						<li
							class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
							<a href="#"><img src="../../img/menu2.png" alt="">
								<div class="mui-media-body">购物车</div>
						</a>
						</li>
						<li
							class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
							<a href="#"><img src="../../img/menu4.png" alt="">
								<div class="mui-media-body">支付</div>
						</a>
						</li>
						<li
							class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
							<a href="#"><img src="../../img/menu5.png" alt="">
								<div class="mui-media-body">搜索</div>
						</a>
						</li>
						<li
							class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
							<a href="#"><img src="../../img/menu6.png" alt="">
								<div class="mui-media-body">更多</div>
						</a>
						</li>
					</ul>
         <h1 @click="jump()">带参数的跳转</h1>
    </div>
</template>
<script>
export default {
  data(){
    return {
      list:[],
      selected:"tab1"
    }
  },
    methods:{
          handleImage(){
            //1：发送ajax请求给服务器
            var url="http://127.0.0.1:3000/imageList";
            this.axios.get(url).then(result=>{
              console.log(result.data);
              this.list=result.data;
            });
            //2:接受服务器返回结果
            //3:将结果保存list
          },
        jump(){
        this.$router.push("/newslist?nid=6")
      },
      },
      
      created(){
        this.handleImage();
      },
}
</script>

<style>
.app  .mint-swipe{
    height:200px;
  }
 .app .mint-swipe img{
    width:100%;
  }
  .mui-table-view{
    background-color: #fff !important;
  }
  .mui-table-view>li img{
    width:60px;height:60px;
  }
</style>