<template>
    <el-container>
        <el-main>
            <el-input label="标题" v-model="resource.title"></el-input>
            <tag-finder @change="onTagsChanged"></tag-finder>
            <text-editor @submit="onSubmit"></text-editor>
        </el-main>
    </el-container>
</template>

<script>
    import textEditor from '@/components/TextEditor'
    import resourceService from '@/service/resource-service'
    import tagFinder from '@/components/TagFinder'

    export default {
        name: "PublishResource",
        components: {textEditor, tagFinder},
        data() {
            return {
                resource: {
                    title: '',
                    content: [''],
                    tag: [],
                },
            }
        },
        methods: {
            onTagsChanged(tags) {
                this.resource.tag = tags;
                console.log(this.resource.tag);
            },
            onSubmit(data) {
                this.resource.content[0] = data.content;
                console.log(data);
                resourceService.postResource(this.resource, response => {

                });
            },
        }
    }
</script>

<style scoped>

</style>