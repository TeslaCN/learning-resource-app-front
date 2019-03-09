<template>
    <el-container>
        <el-col :span="18">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
            |
            <router-link to="/search">Search</router-link>
            |
            <router-link to="/problem">Problem</router-link>
            <span v-if="!$store.state.userInfo">
                            |
                            <router-link to="/sign-in">Sign In</router-link>
                            |
                            <router-link to="/sign-up">Sign Up</router-link>
                        </span>
            <span v-else>
                            |<router-link to="/publish-resource">Publish Resource</router-link>
                            |<router-link to="/sign-out">Sign Out</router-link>
                        </span>
        </el-col>
        <el-col :span="6">
            <user-bar></user-bar>
        </el-col>
    </el-container>
</template>

<script>
    import userBar from '@/components/UserBar'

    export default {
        name: "Navigate",
        components: {userBar},
    }
</script>

<style scoped>

</style>