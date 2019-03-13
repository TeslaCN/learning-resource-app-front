<template>
    <el-container>
        <el-main>
            <el-input label="标题" v-model="resource.title"></el-input>
            <text-editor @submit="onSubmit"></text-editor>
        </el-main>
    </el-container>
</template>

<script>
    import textEditor from '@/components/TextEditor'
    import resourceService from '@/service/resource-service'

    export default {
        name: "PublishResource",
        components: {textEditor},
        data() {
            return {
                resource: {
                    title: '',
                    content: '',
                    tag: [''],
                },
            }
        },
        methods: {
            onSubmit(data) {
                this.resource.content = data.content;
                console.log(data);
                resourceService.postResource(this.resource, response => {

                });
            },
        }
    }
</script>

<style scoped>

</style>