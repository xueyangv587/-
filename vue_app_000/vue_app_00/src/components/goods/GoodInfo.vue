<template>
  <div>
    <!-- 轮播图 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- 调用子组件  给子组件传递参数 :list-->
            <swiper-box :list="rows"></swiper-box>
          </div>
        </div>
      </div>
    <!-- 商品信息 -->
    <div class="mui-card">
       <div class="mui-card-header">
         {{info.lname}}
       </div>
       <div class="mui-card-content">
         <div class="mui-card-content-inner">
           <p>销售价:{{info.price}}</p>
            购买数量:
            <div class="mui-numbox">
              <button class="mui-btn mui-btn-numbox-minus" type="button" @click="reduce">-</button>
              <input class="mui-input-numbox" type="number"  v-model="val">
              <button @click="add" class="mui-btn mui-btn-numbox-plus" type="button">+</button>
            </div>
         </div>
       </div>
       <div class="mui-card-footer">
         <mt-button type="danger" size="small" @click="addcart">加入购物车</mt-button>
       </div>
     </div>
    <!-- 商品参数 -->
  </div>
</template>

<script>
// 引入子组件
import {Toast} from "mint-ui"
import swiperBox from "../sub/swiper-box.vue";
export default {
    data(){
      return{
        rows:[], //创建数组保存子组件显示数据
        info:{},
        val:1,
        pid:this.$route.query.pid
      }
    },
    methods:{
      getImages(){
        var url="http://127.0.0.1:3000/imageList";
        this.axios.get(url).then(result=>{
          this.rows=result.data;
        })
      },
      findGood(){
        console.log(this.pid);
        var url="http://127.0.0.1:3000/findProduct?pid="+this.pid;
        this.axios.get(url).then(result=>{
          this.info=result.data.data[0];
        })
      },
      add(){
        this.val++;
      },
      reduce(){
        if(this.val>1){
          this.val--;
        }
      },
      addcart(){
        var pid=this.pid;
        var price=this.info.price;
        var uid=2;
        console.log(pid+"_"+price+"_"+uid);
        var url="http://127.0.0.1:3000/addcart?pid="+pid;
        url+="&price="+price;
        url+="&uid="+uid;
        this.axios.get(url).then(result=>{
          if(result.data.code==1){
            Toast("添加成功")
          }else{
            Toast("添加失败")
          } 
        })
      }

    },
    created(){
      this.getImages();
      this.findGood();
    },
    // 注册轮播组件
    components:{
      "swiper-box":swiperBox
    }

}
// 1:父组件发送ajax请求返回图片列表
//  2:将列表传子组件
</script>

<style>

</style>