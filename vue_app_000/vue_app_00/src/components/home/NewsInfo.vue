<template>
  <div>
    <h3>新闻详情</h3>
    <!-- 当前新闻详情信息 -->
     <div class="mui-card">
       <div class="mui-card-header mui-card-media" :style="'height:40vw;background-image:url('+list.img_url+')'"></div>
       <div class="mui-card-content">
         <div class="mui-card-content-inner">
           <p>posted on {{list.ctime | datatime}}</p>
           <p style="color:#333;">新闻详细信息...
              {{list.content}}
           </p>
         </div>
       </div>
       <div class="mui-card-footer">
         <a href="" class="mui-card-link">Like</a>
         <a href="" class="mui-card-link">Read more</a>
       </div>
     </div>
    <!-- 评论 -->
    <comment></comment>
  </div>
</template>
<script>
import comment from '../sub/comment.vue'
export default {
  data(){
    return{
      id:0,
      list:[]
    }
  },
  methods:{
    ajax(){
      var url="http://127.0.0.1:3000/findnewsinfo?id="+this.id;
      this.axios.get(url).then(result=>{
        console.log(result.data.data[0]);
        this.list=result.data.data[0];
        console.log(this.list);
      })
    }
    },
  created(){
    console.log(this.$route.query.nid)
    this.id=this.$route.query.nid;
    this.ajax();
  },
  components:{
    "comment":comment
  }
}
</script>

<style>

</style>