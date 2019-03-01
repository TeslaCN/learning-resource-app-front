<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="18">
                        <router-link to="/">Home</router-link>
                        |
                        <router-link to="/about">About</router-link>
                        |
                        <router-link to="/search">Search</router-link>
                        |
                        <router-link to="/coding">Coding</router-link>
                        <span v-if="!$store.state.userInfo">
                            |
                            <router-link to="/sign-in">Sign In</router-link>
                            |
                            <router-link to="/sign-up">Sign Up</router-link>
                        </span>
                        <span v-else>
                            |<router-link to="/sign-out">Sign Out</router-link>
                        </span>
                    </el-col>
                    <el-col :span="6">
                        <user-bar></user-bar>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
    import userBar from '@/components/UserBar'

    export default {
        components: {
            userBar
        },
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
