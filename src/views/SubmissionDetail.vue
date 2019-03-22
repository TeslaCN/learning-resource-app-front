<template>
    <div>
        <submission-view :submission="submission"></submission-view>
    </div>
</template>

<script>
    import submissionView from '@/components/SubmissionView'
    import codingService from '@/service/coding-service'

    export default {
        name: "SubmissionDetail",
        components: {submissionView},
        data() {
            return {
                submission: null,
            }
        },
        computed: {
            submissionId() {
                return this.$route.params.submissionId;
            }
        },
        mounted() {
            codingService.getSubmissionDetail(this.submissionId, response => {
                this.submission = response.data.body;
            });
        }
    }
</script>

<style scoped>

</style>