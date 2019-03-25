<template>
    <el-table v-if="histories" v-loading="loadingHistories" :data="histories" style="width: 100%;">
        <el-table-column label="标题" width="300">
            <template slot-scope="scope">
                <a :href="scope.row.source === 'spider' ? scope.row.url : '#/resource/' + scope.row.id">{{scope.row.title}}</a>
            </template>
        </el-table-column>
        <el-table-column label="日期" prop="viewTime" width="240"></el-table-column>
    </el-table>
</template>

<script>
    import userService from '@/service/user-service'

    export default {
        name: "HistoryList",
        data() {
            return {
                loadingHistories: false,
                histories: [],
            }
        },
        computed: {
            userId() {
                return this.$store.getters.userId;
            }
        },
        methods: {
            loadHistories() {
                this.loadingHistories = true;
                let histories = this.histories;
                userService.getHistories(this.userId, response => {
                    histories.length = 0;
                    histories.push(...response.data.body);
                    this.loadingHistories = false;
                });
            }
        },
        mounted() {
            this.loadHistories();
        }
    }
</script>

<style scoped>

</style>