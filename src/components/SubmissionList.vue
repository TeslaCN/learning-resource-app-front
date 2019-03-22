<template>
    <div>
        <el-table :data="submissions" :row-class-name="rowClassName">
            <el-table-column fixed label="操作" width="80">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="onClick(scope.row)">查看详细</el-button>
                </template>
            </el-table-column>
            <el-table-column label="运行结果" prop="accepted" width="100"></el-table-column>
            <el-table-column label="提交时间" prop="time" width="300"></el-table-column>
            <el-table-column label="测试样例总数" prop="usedTestcaseCount" width="50"></el-table-column>
            <el-table-column label="通过样例数" prop="acceptedTestcaseCount" width="50"></el-table-column>
            <el-table-column label="通过率(%)" prop="acceptedRate" width="50"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import codingService from '@/service/coding-service'

    export default {
        name: "SubmissionList",
        data() {
            return {
                submissions: [],
            }
        },
        methods: {
            rowClassName({row, rowIndex}) {
                return row.accepted ? 'success-row' : row.compileSuccess ? 'warning-row' : 'error-row'
            },
            getSubmissions(userId, problemId) {
                codingService.getSubmissions(userId, problemId, response => {
                    this.submissions.length = 0;
                    this.submissions.push(...response.data.body.reverse());
                    this.submissions.forEach(o => o.acceptedRate = o.acceptedTestcaseCount / o.usedTestcaseCount * 100);
                });
            },
            onClick(row) {
                console.log(row);
            },
        }
        ,
        mounted() {
            this.getSubmissions(this.$store.getters.userId);
        }
    }
</script>

<style>
    .el-table .error-row {
        background: #ffae96;
    }

    .el-table .warning-row {
        background: #fdf096;
    }

    .el-table .success-row {
        background: #b3f9b4;
    }
</style>