<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  components:{
  },
  name: 'App'
}
</script>

<style lang="less">
  
body{
  margin: 0px;
  box-sizing: border-box;
  height: 100%;
}

::-webkit-scrollbar {display:none}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // height: 100vh;
}
</style>

