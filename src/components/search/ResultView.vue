<template>
    <el-row>
        <a v-if="item.highlights.title && item.highlights.title[0]" class="result-title"
           @click="onClick(item.resourceEntity)" :href="item.resourceEntity.source === 'spider' ? item.resourceEntity.url : '#/resource/' + item.resourceEntity.id" target="_blank">
            <span v-html="item.highlights.title[0]"></span>
        </a>
        <a v-else class="result-title" @click="onClick(item.resourceEntity)" :href="item.resourceEntity.url"
           target="_blank">{{item.resourceEntity.title}}</a>
        <br>
        <el-tag v-for="(tag, index) in item.resourceEntity.tag" :key="index" size="mini">{{tag}}</el-tag>
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
            isSignedIn(){
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