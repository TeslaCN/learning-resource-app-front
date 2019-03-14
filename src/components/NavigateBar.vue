<template>
    <el-container>
        <el-col :span="18">
            <el-tabs v-model="activedTab" @tab-click="handleClick">
                <el-tab-pane v-for="tab in commonTabs" :key="tab.name" :label="tab.label"
                             :name="tab.name"></el-tab-pane>
            </el-tabs>
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
        data() {
            return {
                commonTabs: [
                    {label: '主页', name: '/'},
                    {label: '搜索', name: '/search'},
                    {label: '编程', name: '/problem', requireSignIn: true},
                    {label: '发布', name: '/publish-resource', requireSignIn: true},
                ],
                activedTab: '/',
            }
        },
        computed: {
            isSignedIn() {
                return this.$store.getters.isSignedIn;
            },
        },
        methods: {
            handleClick(tab, event) {
                this.$router.push(this.activedTab);
            }
        },
    }
</script>

<style scoped>

</style>