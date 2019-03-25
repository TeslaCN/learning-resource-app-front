<template>
    <el-container>
        <el-main>
            <submission-list @detail="onDetail"></submission-list>
        </el-main>

        <el-dialog title="详细提交信息" :visible.sync="dialogVisible" width="90%">
            <submission-view :submission="selectedSubmission"></submission-view>
        </el-dialog>

    </el-container>
</template>

<script>
    import submissionList from '@/components/SubmissionList'
    import submissionView from '@/components/SubmissionView'

    export default {
        name: "Submission",
        components: {submissionList, submissionView},
        data() {
            return {
                dialogVisible: false,
                selectedSubmission: null,
            }
        },
        methods: {
            onDetail(submission) {
                this.selectedSubmission = submission;
                this.dialogVisible = true;
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>