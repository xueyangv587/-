<template>
  <div>
    <h3>新闻列表</h3>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
        <router-link :to="'/newsinfo?nid='+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" alt="">
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis p_display">
              <span>
                {{item.ctime | datatimeFilter}}
              </span>
              <span>点击{{item.point}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    <mt-button type="primary" size="large" @click="getMore()">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[],
      pno:1,
      pageSize:7
    }
  },
  methods:{
    ajax(){
      var url="http://127.0.0.1:3000/newslist"
      this.axios.get(url).then(result=>{
        this.list=result.data.data;
      })
    },
    //加载更多
    getMore(){
      this.pno++;
      //发送请求get
      var url="http://127.0.0.1:3000";
      url+="/newslist?pno="+this.pno;
      url+="&pageSize="+this.pageSize;
      this.axios.get(url).then(result=>{
           //concat  拼接数据 把所有请求次数的数据整合一起
       var rows=this.list.concat(result.data.data);
       console.log(result.data.data);
       this.list=rows;
      })
    }
  },
  created(){
    this.ajax();
    console.log(this.$route.query.nid);
  }

}
</script>

<style>
/* 日期和点击次数两端对齐 */
  .p_display{
    display: flex;
    justify-content: space-between;
    color:#226aff;
  }
</style>