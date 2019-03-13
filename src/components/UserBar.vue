<template>
    <div v-if="userInfo">
        <span>{{userInfo.username}}</span>
        <router-link to="/sign-out">退出登录</router-link>
    </div>
    <div v-else>
        <span>
            <router-link to="/sign-in">请登录</router-link>
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