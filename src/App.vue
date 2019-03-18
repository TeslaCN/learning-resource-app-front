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
        },
        mounted() {
            this.$router.beforeEach((to, from, next) => {
                let userRoles = this.$store.getters.userRoles;
                let isSignedIn = this.$store.getters.isSignedIn;
                if (to.matched.some(record => record.meta.requireSignIn)){
                    if (!isSignedIn) {
                        next('/sign-in');
                        return;
                    }
                    let requireRoles = to.meta.roles;
                    let allow = !requireRoles || requireRoles.map(r => userRoles.includes(r)).reduce((a, b) => a || b);
                    if (allow) {
                        next();
                    } else {
                        console.info(`Access denied => ${to.path} Required: ${requireRoles}, Current: ${userRoles}`);
                        next('/access-denied');
                        return;
                    }
                }
                if (to.matched.some(record => record.meta.requireUnsigned)) {
                    if (isSignedIn) {
                        next(from.path);
                        return;
                    }
                }
                next();
            });

        }
    };
</script>

<style lang="less">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
