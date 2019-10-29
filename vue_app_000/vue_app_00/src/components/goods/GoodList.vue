<template>
  <div class="app-goodlist">
    <!-- 商品项目 -->
    <div class="goods-item" v-for="item in list" :key="item.lid">
      <img :src="'http://127.0.0.1:3000/'+item.md" @click="skip" :data-lid="item.lid" alt=""> <!--自定义属性:data-lid="item.lid"  用来传参 -->
      <h4>{{item.title}}</h4>
      <div class="info">
        <span class="now">¥{{item.price.toFixed(2)}}</span>
      </div>
      <div class="sell">
        <span>热卖中</span>
      </div>
    </div> 
    <mt-button type="primary" size="large" @click="ajax()">加载更多</mt-button>         
  </div>
</template>
<script>
export default {
  data(){
    return{
        list:[
          
        ],
        pno:0,
        pageSize:4
    }
  },
  methods:{
    ajax(){
      this.pno++;
      var url="http://127.0.0.1:3000/product";
      url+="?pno="+this.pno;
      url+="&pageSize="+this.pageSize;
      this.axios.get(url).then(result=>{
        var rows=this.list.concat(result.data.data);
        console.log(result.data.data)
        this.list=rows;
      })
    },
    skip(e){
      // e.target.dataset  接收自定义属性的参数
      var pid=e.target.dataset.lid;
      console.log(pid)
     this.$router.push("/goodinfo?pid="+pid);
    }
  },
  created(){
    this.ajax();
  }
}
</script>

<style>
/* 外层父元素 */
  .app-goodlist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding:4px;
  }
  /* 商品项 */
  .goods-item{
    width:49%;
    border:1px solid #ccc;
    box-shadow:0 0 8px #ccc;
    margin:4px 0;
    padding: 2px; 
    display: flex;
    flex-direction: column;
    min-height:230px;
    justify-content: space-between;  
  }
  /* 图片 */
  .goods-item img{
    width:100%;
  }
  .goods-item h4{
    font-size:18px;
  }
  .goods-item .now{
    color: red;
    font-size: 16px;
    font-weight:bold;
  }
</style>