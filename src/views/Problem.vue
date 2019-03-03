<template>
    <el-container>
        <el-main>
            <problem-list></problem-list>
        </el-main>
    </el-container>
</template>

<script>
    import problemList from '@/components/ProblemList'

    export default {
        name: "Problem",
        components: {problemList},

    }
</script>

<style scoped>

</style>