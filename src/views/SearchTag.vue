<template>
    <el-container>
        <el-header>
            <tag-finder @change="onChange"></tag-finder>
        </el-header>
        <el-main>
            <problem-list :prop-problems="problems"></problem-list>
        </el-main>
    </el-container>
</template>

<script>
    import tagFinder from '@/components/TagFinder'
    import problemList from '@/components/ProblemList'
    import codingService from '@/service/coding-service'

    export default {
        name: "SearchTag",
        components: {tagFinder, problemList},
        data() {
            return {
                tags: [],
                problems: [],
            }
        },
        methods: {
            onChange(tags) {
                this.tags = tags;
                this.loadProblemsByTags();
            },
            loadProblemsByTags() {
                let problems = this.problems;
                codingService.getProblemsByTags(this.tags, response => {
                    problems.length = 0;
                    problems.push(...response.data.body);
                });
            }
        },
    }
</script>

<style scoped>

</style>