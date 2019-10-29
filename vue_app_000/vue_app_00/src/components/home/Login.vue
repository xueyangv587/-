<template>
  <div>
    <div class="mui-card">
      <div class=mui-card-content>
        <div class="mui-card-content-inner">
          <form action="">
           用户名: <input type="text" name="uname" v-model="uname">
             密码: <input type="password" name="upwd" v-model="upwd">
                  <input type="button" @click="login" value="登录"> 
          </form>
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
      uname:"",
      upwd:""
    }
  },
  methods:{
    login(){
      //1:获取用户输入用户名和密码
      var name=this.uname;
      var pwd=this.upwd;
      console.log(name,pwd);
      //2:验证不能为空
      var reg=/^[a-z0-9]{3,12}$/i;
      if(!reg.test(name)){
        Toast("用户名格式不正确,请检查");
        return;
      }
      //3:发送ajax请求
      var url="http://127.0.0.1:3000/login?";
        url+="uname="+name+"&upwd="+pwd;
        this.axios.get(url).then(result=>{
          if(result.data.code==1){
            this.$router.push("/thome");
          }else{
            Toast("用户名或密码有误");
          }
        })
      //4:失败 显示提示框

      //5:成功 跳转home
    }
  },
  created(){

  }
}
</script>

<style>

</style>