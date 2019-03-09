<template>
    <el-container>
        <el-main>
            <div v-for="p in problems">
                <router-link :to="problemUrlPrefix + p.title"><span>{{p.title}}</span></router-link>
            </div>
            <div>
                <el-pagination
                        @size-change="getList"
                        @current-change="getList"
                        :current-page="page"
                        :page-sizes="pageSizes"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import codingService from '@/service/coding-service'

    export default {
        name: "ProblemList",
        data() {
            return {
                problemUrlPrefix: '/problem/',
                problems: [],
                page: 1,
                pageSize: 10,
                pageSizes: [10, 50, 100],
                total: 0,
            }
        },
        methods: {
            getList() {
                let problems = this.problems;
                codingService.getProblemList(this.page, this.pageSize, response => {
                    problems.length = 0;
                    problems.push(...response.data.body);
                });
            },
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>