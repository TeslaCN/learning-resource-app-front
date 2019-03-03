<template>
    <el-container>
        <!--<el-header>-->
            <!--<h1>{{problemTitle}}</h1>-->
        <!--</el-header>-->
        <el-main>
            <el-row>
                <h1>{{problemTitle}}</h1>
            </el-row>
            <el-row>
                <p>{{problemDescription}}</p>
            </el-row>
            <el-row>
                <code-editor></code-editor>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import codeEditor from '@/components/CodeEditor'
    import codingService from '@/service/coding-service'

    export default {
        name: "Coding",
        components: {codeEditor},
        computed: {
            problemTitle() {
                return this.$route.params.title;
            }
        },
        data() {
            return {
                problemDescription: '1+1=2',

            }
        },
        mounted() {
            let title = this.problemTitle;
            codingService.getProblem(title, response => {

            });
        }
    }
</script>

<style scoped>

</style>