<template>
    <el-container v-loading="loading">
        <el-header>
            <el-alert title="登录解锁更多功能🌚" type="info" show-icon></el-alert>
        </el-header>
        <el-main>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="账号">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="记住我">
                    <el-switch v-model="form.remember" inactive-text="1小时" active-text="30天"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
    import userService from '@/service/user-service'

    export default {
        name: "SignIn",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    remember: false,
                },
                loading: false,
            }
        },
        methods: {
            onSubmit() {
                this.loading = true;
                let form = this.form;
                userService.signIn(form, response => {
                    if (response.headers.hasOwnProperty('token')) {
                        let token = response.headers.token;
                        this.$store.commit('updateToken', {token});
                        let encodedPayload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
                        let payload = JSON.parse(atob(encodedPayload));
                        if (payload.USER) {
                            let userInfo = payload.USER;
                            this.$store.commit('updateUserInfo', {userInfo});
                        }
                        this.$router.back();
                    }
                }, reason => {
                    this.$message('登录失败！用户不存在或密码错误');
                }, () => {
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>