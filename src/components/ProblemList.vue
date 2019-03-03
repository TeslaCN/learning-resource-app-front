<template>
    <el-container>
        <el-main>
            <div v-for="p in problems">
                <router-link :to="problemUrlPrefix + p.title"><span>{{p.title}}</span></router-link>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "ProblemList",
        data() {
            return {
                problemUrlPrefix: '/problem/',
                // problems: [],
                problems: [
                    {
                        title: 'Sum',
                    },
                    {
                        title: 'Sort',
                    }
                ],
            }
        },
    }
</script>

<style scoped>

</style>