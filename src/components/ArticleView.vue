<template>
    <div>
        <h1>{{article.title}}</h1>
        <el-tag v-for="tag in article.tag" :key="tag">{{tag}}</el-tag>
        <p v-for="content in article.content" v-html="content"></p>
    </div>
</template>

<script>
    export default {
        name: "ArticleView",
        props:[
            'article'
        ],
        data() {
            return {}
        },
    }
</script>

<style scoped>

</style>