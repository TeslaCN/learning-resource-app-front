<template>
    <article-view v-if="article" :article="article"></article-view>
    <div v-else>Oops... Not found</div>
</template>

<script>
    import resourceService from '@/service/resource-service'
    import articleView from '@/components/ArticleView'

    export default {
        name: "Resource",
        components: {articleView},
        data() {
            return {
                article: null,
            }
        },
        computed: {
            resourceId() {
                return this.$route.params.resourceId;
            }
        },
        methods: {
            load(resourceId) {
                resourceService.getResource(resourceId, response => {
                    this.article = response.data.body;
                });
            }
        },
        mounted() {
            this.load(this.resourceId);
        }
    }
</script>

<style scoped>

</style>