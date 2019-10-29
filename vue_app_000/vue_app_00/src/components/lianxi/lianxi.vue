<template>
  <div class="app">
    <ul>
      <li class="active">推荐</li>
      <li>手机数码</li>
      <li>健康生活</li>
      <li>电子票券</li>
      <li>家用电器</li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style>
.active{
border-bottom: 1px solid red;
}
  .app ul{
    list-style: none;
    margin:10px 0;padding: 0;
    display:flex;
    justify-content: space-around;
  }
</style>