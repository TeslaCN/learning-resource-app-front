<template>
    <el-container>
        <el-header>
            <autocomplete-finder @confirm="query"/>
        </el-header>
        <el-main>
            <div v-if="tookInMillis >= 0">
                <span>搜索耗时: </span><strong>{{tookInMillis / 1000}}</strong><span>秒</span><br>
            </div>
            <result-view v-for="result in results" :key="result.resourceEntity.url" :item="result" :style="{marginBottom: '10px'}"/>
        </el-main>
        <el-footer>
            <div class="block" v-if="results.length > 0">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="pageSizeOption"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
    import autocompleteFinder from '@/components/search/Finder'
    import searchService from '@/service/search-service'
    import resultView from '@/components/search/ResultView'

    export default {
        components: {autocompleteFinder, resultView},
        name: "Search",
        data() {
            return {
                text: '',
                results: [],
                tookInMillis: -1,
                currentPage: 1,
                total: 0,
                pageSize: 10,
                pageSizeOption: [10, 20, 50],
            }
        },
        methods: {
            query(text, page = this.currentPage, size = this.pageSize) {
                this.text = text;
                this.results = [];
                searchService.getMatch(text, response => {
                    this.results.push(...response.data.body.searchResults);
                    this.total = response.data.body.total;
                    this.tookInMillis = response.data.body.tookInMillis;
                }, page, size);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.query(this.text, this.currentPage, val);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.query(this.text, val, this.pageSize);
            },
        }
    }
</script>

<style lang="less">
</style>