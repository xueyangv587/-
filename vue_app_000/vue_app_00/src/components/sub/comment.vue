<template>
  <div> 
    <div class="mui-card">
      <div class="mui-card-header"></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <textarea placeholder="请吐槽最多120个字" cols="20" rows="5" maxlength="120" v-model="msg"></textarea>
          <mt-button type="primary" size="large" @click="addcomment()">发表评论</mt-button>
        </div>
      </div>
      <div class="mui-card-footer">
        <div class="cmt-list">
          <div class="cmt-item" v-for="(item,i) in list" :key="item.id">
            <div>第{{i+1}}楼 发表时间{{item.ctime | datatimeFilter}}</div>
            <div>{{item.content}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import {Toast} from "mint-ui"
export default {
  data(){
    return{
      pno:0,
      pageSize:5,
      list:[],
      msg:""
    }
  },
  created(){
    this.getMore();
  },
  methods:{
    // 添加评论
    addcomment(){
      //获取评论内容
      var msg=this.msg;
      //trim()去除字符串两端的空格
      var size=msg.trim().length;
      if(size==0){
        //添加提示框
        Toast("评论内容不能为空");
        return;
      }
      var nid=this.$route.query.nid;
      console.log(nid)
      //1:创建参数对象 postData
      var postDate=this.qs.stringify({
        nid:nid,
        content:this.msg
      });
      //2:发送post请求
      var url="http://127.0.0.1:3000/";
      url+="addcomment"
      this.axios.post(url,postDate).then(result=>{
        console.log(result.data);
        //1:提示框 发表成功 
        Toast(result.data.msg);
        //2:清空评论区域内容
        this.msg="";
        //2.1:清空页码
        this.pno=0;
        //2.2:清空原有数组
        this.list=[];
        //3:立即查看评论结果
        this.getMore();
      });
      
      //3:接受返回数据
      //4:在created()调用 
    },
    getMore(){
      this.pno++;
      var url="http://127.0.0.1:3000/";
      url+="getComment?nid="+this.$route.query.nid;
      url+="&pno="+this.pno;
      url+="&pageSize="+this.pageSize;
      this.axios.get(url).then(result=>{
        console.log(result.data.data);
        var rows=this.list.concat(result.data.data);
        this.list=rows;
      })
    }
  }
  
}
</script>

<style>

</style>