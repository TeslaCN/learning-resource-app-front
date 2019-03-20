<template>
    <el-container>
        <el-header>
            <router-link to="/publish-problem"></router-link>
        </el-header>
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