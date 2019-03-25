<template>
    <el-container>
        <el-header>
            <tag-finder @change="onChange"></tag-finder>
        </el-header>
        <el-main>
            <h3>相关编程题</h3>
            <problem-list :prop-problems="problems"></problem-list>
            <h3>相关文章</h3>
            <resource-list :tags="tags"></resource-list>
        </el-main>
    </el-container>
</template>

<script>
    import tagFinder from '@/components/TagFinder'
    import problemList from '@/components/ProblemList'
    import codingService from '@/service/coding-service'
    import resourceList from '@/components/ResourceList'

    export default {
        name: "SearchTag",
        components: {tagFinder, problemList, resourceList},
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