<template>
    <el-container v-loading="loading">
        <el-main>
            <el-row v-for="(resource, index) in resources" :key="index">
                <a class="result-title" v-if="resource.title"
                   :href="resource.source === 'spider' ? resource.url : '#/resource/' + resource.id" target="_blank">{{resource.title}}</a>
                <br>
                <a class="result-url" :href="resource.source === 'spider' ? resource.url : '#/resource/' + resource.id"
                   target="_blank">{{resource.url || resource.id}}</a>
                <br>
                <el-tag v-for="(tag, index) in resource.tag" :key="index" :type="tags.includes(tag) ? 'danger' : ''">
                    {{tag}}
                </el-tag>
            </el-row>
        </el-main>
        <el-footer>
            <el-pagination
                    v-if="total > 0"
                    @size-change="sizeChanged"
                    @current-change="pageChanged"
                    :current-page="page"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
    import searchService from '@/service/search-service'

    export default {
        name: "ResourceList",
        props: {
            tags: Array,
        },
        data() {
            return {
                loading: false,
                total: 0,
                page: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50],
                resources: [],
            }
        },
        methods: {
            sizeChanged(size) {
                this.pageSize = size;
                this.getList();
            },
            pageChanged(page) {
                this.page = page;
                this.getList();
            },
            getList() {
                if (this.tags.length < 1) {
                    return;
                }
                this.loading = true;
                searchService.queryTermTags(this.tags, this.page, this.pageSize, response => {
                    this.total = response.data.body.total;
                    let resources = response.data.body.searchResults.map(r => r.resourceEntity);
                    this.resources.length = 0;
                    this.resources.push(...resources);
                }, undefined, () => {
                    this.loading = false;
                });
            }
        },
        watch: {
            tags() {
                this.getList();
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>
    .result-title {
        /*text-decoration-line: blink;*/
    }

    .result-url {
        text-decoration: none;
    }
</style>