<template>
  <div>
    <ul>
      <li v-for="item of list" :key="item.id">{{item.id}}--姓名:{{item.name}}--年龄:{{item.age}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[
        {id:1,name:"tom",age:12},
        {id:2,name:"jerry",age:14},
        {id:3,name:"harry",age:16}
      ]
    }
  }
}
</script>

<style>

</style>