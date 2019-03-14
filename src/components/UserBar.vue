<template>
    <div v-if="userInfo">
        <span>{{userInfo.username}}</span>
        <router-link to="/sign-out">
            <el-button>退出</el-button>
        </router-link>
    </div>
    <div v-else>
        <span>
            <router-link to="/sign-up">
                <el-button>注册</el-button>
            </router-link>
            <router-link to="/sign-in">
                <el-button type="primary">登录</el-button>
            </router-link>
        </span>
    </div>
</template>

<script>
    export default {
        name: "UserBar",
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            }
        }
    }
</script>

<style scoped>

</style>