<template>
    <div id="app">
        <el-container>
            <el-header>
                <navigate-bar></navigate-bar>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
    import navigateBar from '@/components/NavigateBar'

    export default {
        components: {navigateBar},
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
        /*text-align: center;*/
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
