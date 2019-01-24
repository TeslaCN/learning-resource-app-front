<template>
    <el-row>
        <a v-if="item.highlights.title && item.highlights.title[0]" class="result-title" :href="item.resourceEntity.url" target="_blank">
            <span v-html="item.highlights.title[0]"></span>
        </a>
        <a v-else class="result-title" :href="item.resourceEntity.url" target="_blank">{{item.resourceEntity.title}}</a>
        <br>
        <a class="result-url" :href="item.resourceEntity.url" target="_blank">{{item.resourceEntity.url}}</a>
        <div v-for="values in item.highlights">
            <span v-for="value in values" v-html="value"></span>
        </div>
    </el-row>
</template>

<script>
    export default {
        name: "ResultView",
        data() {
            return {};
        },
        props: ['item'],
    }
</script>

<style lang="less">
    em {
        color: red;
    }

    .result-url {
        text-decoration: none;
    }
</style>