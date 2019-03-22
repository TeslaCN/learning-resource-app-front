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
                    {label: '搜索资源', name: '/search'},
                    {label: '在线编程', name: '/problem', requireSignIn: true},
                    {label: '发布文章', name: '/publish-resource', requireSignIn: true},
                    {label: '发布题目', name: '/publish-problem', requireSignIn: true},
                    {label: '提交历史', name: '/submission', requireSignIn: true},
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
            },
            checkPath() {
                let currentPath = this.$route.path;
                this.commonTabs.map(o => o.name).forEach(p => {
                    this.activedTab = currentPath.includes(p) ? p : this.activedTab;
                })
            },
        },
        watch: {
            '$route': 'checkPath',
        },
        mounted() {
            this.checkPath();
        }
    }
</script>

<style scoped>

</style>