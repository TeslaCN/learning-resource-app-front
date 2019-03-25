<template>
    <div>
        <el-alert title="屏幕宽度不够时，请使用滚轮或者滚动条向右滚动表格内容。" type="info" show-icon></el-alert>
        <el-table :data="submissions" :row-class-name="rowClassName">
            <el-table-column fixed label="操作" width="70">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="onClick(scope.row)">查看详细</el-button>
                </template>
            </el-table-column>
            <el-table-column label="评判编号" prop="id" width="160"></el-table-column>
            <el-table-column label="语言" prop="language" width="60"></el-table-column>
            <el-table-column label="运行结果" width="90">
                <template slot-scope="scope">
                    <!--<el-tag v-if="scope.row.accepted" type="success">运行通过</el-tag>-->
                    <!--<el-tag v-else-if="!scope.row.compileSuccess" type="danger">编译出错</el-tag>-->
                    <!--<el-tag v-else-if="scope.row.compileSuccess&&!scope.row.accepted" type="warning">编译通过</el-tag>-->
                    <el-tag v-if="!scope.row.judged">未评判</el-tag>
                    <el-tag v-else-if="scope.row.accepted">运行通过</el-tag>
                    <el-tag v-else-if="!scope.row.compileSuccess">编译出错</el-tag>
                    <el-tag v-else-if="scope.row.compileSuccess&&!scope.row.accepted">编译通过</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="提交时间" prop="time" width="230"></el-table-column>
            <el-table-column label="评判时间" prop="judgeTime" width="230"></el-table-column>
            <el-table-column label="运行次数" prop="usedTestcaseCount" width="100"></el-table-column>
            <el-table-column label="通过样例数" prop="acceptedTestcaseCount" width="100"></el-table-column>
            <el-table-column label="通过率(%)" prop="acceptedRate" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.acceptedTestcaseCount / scope.row.usedTestcaseCount * 100}}%</span>
                </template>
            </el-table-column>
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
                return !row.judged ? '' : row.accepted ? 'success-row' : row.compileSuccess ? 'warning-row' : 'error-row'
            },
            getSubmissions(userId, problemId) {
                codingService.getSubmissions(userId, problemId, response => {
                    this.submissions.length = 0;
                    this.submissions.push(...response.data.body.reverse());
                });
            },
            onClick(row) {
                this.$emit('detail', row);
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