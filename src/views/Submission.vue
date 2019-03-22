<template>
    <el-container>
        <el-main>
            <submission-list></submission-list>
        </el-main>
    </el-container>
</template>

<script>
    import submissionList from '@/components/SubmissionList'

    export default {
        name: "Submission",
        components: {submissionList},
        data() {
            return {}
        },
        methods: {

        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>