<template>
  <div id="app">
    <el-container>
      <el-header>
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>|
        <router-link to="/search">Search</router-link>
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">发现</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">资源搜索</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">实践平台</el-tab-pane>
        </el-tabs>-->
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #ff00ff;
//     }
//   }
// }
</style>
