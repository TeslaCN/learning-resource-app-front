<template>
    <el-row>
        <a v-if="item.highlights.title && item.highlights.title[0]" class="result-title"
           @click="onClick(item.resourceEntity)"
           :href="item.resourceEntity.source === 'spider' ? item.resourceEntity.url : '#/resource/' + item.resourceEntity.id"
           target="_blank">
            <span v-html="item.highlights.title[0]"></span>
        </a>
        <a v-else class="result-title" @click="onClick(item.resourceEntity)" :href="item.resourceEntity.url"
           target="_blank">{{item.resourceEntity.title}}</a>
        <br>
        <!--<span v-if="item.resourceEntity.tag.length > 0">文章标签 </span>-->
        <el-tag v-for="(tag, index) in item.resourceEntity.tag" :key="index" size="mini">{{tag}}</el-tag>
        <br>
        <span>作者: </span><strong>{{item.resourceEntity.author}}</strong>&nbsp;&nbsp;
        <span>发表日期: </span><strong>{{item.resourceEntity.date}}</strong>&nbsp;&nbsp;
        <span>阅读量: </span><strong>{{item.resourceEntity.readCount}}</strong>&nbsp;&nbsp;
        <br>
        <!--<a class="result-url" @click="onClick(item.resourceEntity)" :href="item.resourceEntity.url" target="_blank">{{item.resourceEntity.url}}</a>-->
        <!--<div v-for="values in item.highlights">-->
        <!--<span v-for="value in values" v-html="value"></span>-->
        <!--</div>-->
        <span v-for="value in item.highlights.content" v-html="value"></span>
        <div style="color: #a8a8a8;">
            <span>索引时间: </span><span>{{new Date(item.resourceEntity.indexDate)}}</span>&nbsp;&nbsp;
            <span>来源: </span><span>{{item.resourceEntity.source == 'spider' ? '爬虫':'站内发布'}}</span>
        </div>
    </el-row>
</template>

<script>
    import userService from '@/service/user-service'

    export default {
        name: "ResultView",
        data() {
            return {};
        },
        computed: {
            isSignedIn() {
                return this.$store.getters.isSignedIn;
            }
        },
        methods: {
            onClick(entity) {
                if (!this.isSignedIn) {
                    return;
                }
                let external = entity.source === 'spider';
                let url = external ? entity.url : entity.id;
                userService.postHistory(entity.title, url, external, response => {
                    console.log('Record: ' + url);
                });
            }
        },
        props: ['item'],
    }
</script>

<style lang="less">
    em {
        color: red;
    }

    .result-title {
        /*text-decoration-line: blink;*/
    }

    .result-url {
        text-decoration: none;
    }
</style>