<template>
    <span v-loading="loading">
        <el-tag v-for="(tag, index) in tags" :key="index" size="mini">{{tag}}</el-tag>
    </span>
</template>

<script>
    import codingService from '@/service/coding-service'

    export default {
        name: "ProblemTagView",
        props: {
            problemId: Number,
        },
        data() {
            return {
                tags: [],
                loading: false,
            }
        },
        watch: {
            problemId() {
                this.loadTags();
            }
        },
        methods:{
            loadTags() {
                this.loading = true;
                codingService.getProblemTags(this.problemId, response => {
                    this.tags.length = 0;
                    this.tags.push(...response.data.body);
                }, undefined, () => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            if (this.problemId) {
                this.loadTags();
            }
        }
    }
</script>

<style scoped>

</style>