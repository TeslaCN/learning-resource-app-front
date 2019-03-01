<template>
    <el-container v-if="$route.params.title">
        <el-header>
            <h1>{{$route.params.title}}</h1>
        </el-header>
        <el-main>
            <code-editor></code-editor>
        </el-main>
    </el-container>
    <el-container v-else>
        <el-main>
            <problem-list></problem-list>
        </el-main>
    </el-container>
</template>

<script>
    import codeEditor from '@/components/CodeEditor'
    import problemList from '@/components/ProblemList'

    export default {
        name: "Coding",
        components: {codeEditor, problemList},

    }
</script>

<style scoped>

</style>