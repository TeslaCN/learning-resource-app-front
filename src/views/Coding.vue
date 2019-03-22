<template>
    <el-container>
        <el-main>
            <problem-view :prop-problem="problem"></problem-view>
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
    import problemView from '@/components/ProblemView'

    export default {
        name: "Coding",
        components: {codeEditor, problemView},
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
                    let submissionId = response.data.body;
                    this.$router.push(`/submission/${submissionId}`);
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