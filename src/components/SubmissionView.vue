<template>
    <div v-if="submission">
        <problem-view :id="submission.problemId"></problem-view>
        <p>
            <label>提交时间</label><br><span>{{submission.time}}</span>
        </p>
        <p>
            <label>评判时间</label><br><span>{{submission.judgeTime}}</span>
        </p>
        <p>
            <label>编程语言</label><br><span>{{submission.language}}</span>
        </p>
        <p v-if="submission.errorCase">
            <label>测试用例</label><br><span>{{JSON.parse(submission.errorCase).case}}<br></span>
            <label>期望结果</label><br><span>{{JSON.parse(submission.errorCase).expect}}<br></span>
            <label>运行结果</label><br><span>{{JSON.parse(submission.errorCase).got}}<br></span>
        </p>
        <p v-if="submission.message">
            <label>错误信息</label><br><span>{{submission.message}}</span>
        </p>
        <p v-if="submission.dignosis">
            <label>错误堆栈</label><br>
            <span v-for="s in submission.dignosis.split('\r\n')">{{s}}<br></span>
        </p>
        <code-view :code="submission.code"></code-view>
    </div>
</template>

<script>
    import codeView from './CodeView'
    import codingService from '@/service/coding-service'
    import problemView from './ProblemView'

    export default {
        name: "SubmissionView",
        components: {codeView, problemView},
        props: {
            submission: Object,
        },
        data() {
            return {
                problem: null,
            }
        },
        methods: {
            loadProblem(problemId) {
                codingService.getProblemById(problemId, response => {
                    this.problem = response.data.body;
                });
            }
        },
        mounted() {
            if (this.submission) {
                this.loadProblem(this.submission.problemId);
            }
        }
    }
</script>

<style scoped>

</style>