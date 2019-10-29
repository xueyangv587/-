<template>
  <div>
    <div class="mui-card">
       <div class="mui-card-header">
         <h3>购物车列表</h3>
         <!-- allcb 全选状态true 选中flase 清空 -->
         <h4>全选 <input type="checkbox" @click="selectAll" :checked="allcb"></h4>
       </div>
       <div class="mui-card-content">
         <div class="mui-card-content-inner">
           <ul class="mui-table-view">
             <li class="mui-table-view-cell mui-media" v-for="(item,i) in list" :key="item.id">
               <a href="javascript:;">
                 <input type="checkbox" :data-i="i" :checked="item.cb" @click="modify">
                 <img class="mui-media-object mui-pull-left" src="" alt="">
                 <div class="mui-media-body">
                   <p class="mui-ellipsis">
                     {{item.lname}}
                     {{item.price}}
                     <button @click="del" :data-id="item.id" :data-idx="i">删除</button>
                   </p>
                 </div>
               </a>
             </li>
           </ul>
         </div>
       </div>
       <div class="mui-card-footer">
         <button @click="removeItem">删除选中商品</button>
         小计:
       </div>
     </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  data(){
    return{
      list:[],
      allcb:true   //保存全选复选框状态
    }
  },
  methods:{
    loadMore(){
      var url="http://127.0.0.1:3000/cartlist?uid=2";
      this.axios.get(url).then(result=>{
        var row=result.data.data;
        //完成操作为列表中每个对象添加属性cb
        //cb表示复选框状态true 当前商品选中
        //cb表示复选框状态false 当前商品清空
        for(var item of row){
          item.cb=false;
        }
        this.list=row;
      })
    },
    del(e){
      //1:获取当前购物车id
      var id=e.target.dataset.id;
      var idx=e.target.dataset.idx;
      //2:发送ajax请求
      var url="http://127.0.0.1:3000/delcartitem?id="+id;
      this.axios.get(url).then(result=>{
      //3:获取返回结果判断是否删除成功 
      //4:删除list对应购物车商品对象
      if(result.data.code==1){
        Toast("删除成功");
        //将数组中对应下标商品删除;
        // this.loadMore();
        //splice(数组小标,个数);
        this.list.splice(idx,1);
      }
      })
    },
    selectAll(e){
      //1.获取当前全选复选框状态
      var cb=e.target.checked;
      this.allcb=cb;
      console.log(this.list);
       for(var item of this.list){
         item.cb=cb;
         console.log(item)
       }
      //2:如果状态true
      //3:将数组中所有cb=true
      //4:如果状态false
      //5:将数组中所有cb=false
    },
    modify(e){
      //1:获取当前元素下标
      var idx=e.target.dataset.i
      //2:将下标对象数组元素cb修改当前复选框
      var checked=e.target.checked;
      //3:将数组中对应cb状态修改
      this.list[idx].cb=checked;
      //4:统计购物车中商品选中数量==list.length
      var count=0;
      for(var item of this.list){
        if(item.cb){
          count++;
        }
      }
      if(count==this.list.length){
        this.allcb=true;
      }else{
        this.allcb=false;
      }
      //5:将全选状态true
    },
    removeItem(){
      //0:创建空字符串,为了后续拼接字符串\
      var html="";
      //1:遍历数组元素
        for(var item of this.list){
           //2:判断cb==true
          if(item.cb==true){
            //3:保存id
            html+=item.id+",";            
         }else{
           break;
         }
        }
         //4:发送ajax请求 删除多个商品
             //3.1:截取字符串
         html=html.substring(0,html.length-1);
        var url="http://127.0.0.1:3000/remove?ids="+html;
         this.axios.get(url).then(result=>{
            if(result.data.code==1){
             Toast("删除成功");
          this.loadMore();
           }else{
             Toast("删除失败");
          }
          })
     
    }
  },
  created(){
    this.loadMore();
  }
}
</script>

<style>

</style>