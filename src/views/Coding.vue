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
                <p>{{problem.description}}</p>
            </el-row>
            <el-row>
                <el-select v-model="selectedLanguage" placeholder="编程语言">
                    <el-option label="Java" value="java"></el-option>
                </el-select>
                <code-editor :language="selectedLanguage" @submit="onSubmit"></code-editor>
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
        methods: {
            onSubmit(object) {
                let entryMethod = object.entryMethod;
                let code = object.code;
                console.log(`ENTRY_METHOD: ${entryMethod}\nCODE:\n${code}`);
                codingService.submit(this.problemTitle, this.selectedLanguage, code, entryMethod, response => {

                });
            }
        },
        data() {
            return {
                problem: {
                    description: '',
                },
                selectedLanguage: 'java',
            }
        },
        mounted() {
            let title = this.problemTitle;
            let problem = this.problem;
            codingService.getProblem(title, response => {
                Object.assign(problem, response.data.body);
            });
        }
    }
</script>

<style scoped>

</style>