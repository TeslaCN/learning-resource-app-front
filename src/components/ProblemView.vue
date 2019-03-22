<template>
    <div v-if="problem">
        <h2>{{problem.title}}</h2>
        <p v-html="problem.description"></p>
    </div>
</template>

<script>
    import codingService from '@/service/coding-service'

    export default {
        name: "ProblemView",
        props: {
            id: Number,
            propProblem: Object,
        },
        data() {
            return {
                problem: this.propProblem,
            }
        },
        methods: {},
        mounted() {
            if (!this.propProblem && this.id) {
                codingService.getProblemById(this.id, response => {
                    this.problem = response.data.body;
                });
            }
        }
    }
</script>

<style scoped>

</style>