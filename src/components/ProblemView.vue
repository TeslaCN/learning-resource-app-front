<template>
    <div v-if="problem" v-loading="loadingProblem">
        <h2>{{problem.title}}</h2>
        <problem-tag-view :problem-id="id || propProblem.id"></problem-tag-view>
        <p v-html="problem.description"></p>
    </div>
</template>

<script>
    import codingService from '@/service/coding-service'
    import problemTagView from './ProblemTagView'

    export default {
        name: "ProblemView",
        components: {problemTagView},
        props: {
            id: Number,
            propProblem: Object,
        },
        data() {
            return {
                loadingProblem: false,
                problem: this.propProblem,
            }
        },
        methods: {
            loadProblemById() {
                this.loadingProblem = true;
                codingService.getProblemById(this.id, response => {
                    this.problem = response.data.body;
                    this.loadingProblem = false;
                });
            },
        },
        watch: {
            id() {
                this.loadProblemById();
            }
        },
        mounted() {
            if (!this.propProblem && this.id) {
                this.loadProblemById();
            }
        }
    }
</script>

<style scoped>

</style>