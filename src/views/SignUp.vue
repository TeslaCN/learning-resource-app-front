<template>
    <el-container v-loading="loading">
        <el-main>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="账号">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="passwordConfirm" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :disabled="disabled">注册</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
    import userService from '@/service/user-service'

    export default {
        name: "SignUp",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                },
                disabled: true,
                passwordConfirm: '',
                loading: false,
            }
        },
        computed: {
            formPassword() {
                return this.form.password;
            }
        },
        watch: {
            formPassword(newVal) {
                this.disabled = !(newVal && newVal === this.passwordConfirm);
            },
            passwordConfirm(newVal) {
                this.disabled = newVal !== this.form.password;
            },
        },
        methods: {
            onSubmit() {
                this.loading = true;
                let form = this.form;
                userService.signUp(form, response => {
                    let user = response.data.body;

                }, undefined, () => {
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>