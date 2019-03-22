<template>
    <div v-if="submission">
        <p>
            <label>提交时间</label><span>{{submission.time}}</span>
        </p>
        <p>
            <label>评判时间</label><span>{{submission.judgeTime}}</span>
        </p>
        <p>
            <label>编程语言</label><span>{{submission.language}}</span>
        </p>
        <code-view :code="submission.code"></code-view>
    </div>
</template>

<script>
    import codeView from './CodeView'

    export default {
        name: "SubmissionView",
        components: {codeView},
        props: {
            submission: Object,
        }
    }
</script>

<style scoped>

</style>