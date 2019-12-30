<template>
 <keep-alive>
   <router-view/>
 </keep-alive>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url("./assets/font_icon/iconfont.css");
@import url("./assets/css/normalize.css");
@import url('./assets/css/index.css');
*{
  margin: 0;
  box-sizing: border-box;
}
body,html{
  
    width: 100%;
    height: 100%;
}
input,button{
  outline: none;
  border: none;
}
img{
  width: 100%;
  height: 100%;
}


</style>
