<template>
    <el-row>
        <a v-if="item.highlights.title && item.highlights.title[0]" class="result-title"
           @click="onClick(item.resourceEntity)" :href="item.resourceEntity.url" target="_blank">
            <span v-html="item.highlights.title[0]"></span>
        </a>
        <a v-else class="result-title" @click="onClick(item.resourceEntity)" :href="item.resourceEntity.url"
           target="_blank">{{item.resourceEntity.title}}</a>
        <br>
        <a class="result-url" @click="onClick(item.resourceEntity)" :href="item.resourceEntity.url" target="_blank">{{item.resourceEntity.url}}</a>
        <div v-for="values in item.highlights">
            <span v-for="value in values" v-html="value"></span>
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
        },
        methods: {
            onClick(entity) {
                let url = entity.url;
                let external = entity.source === 'spider';
                userService.postHistory(url, external, response => {
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

    .result-url {
        text-decoration: none;
    }
</style>