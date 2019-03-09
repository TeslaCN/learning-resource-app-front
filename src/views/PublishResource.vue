<template>
    <el-container>
        <el-form ref="form" :model="resource">
            <el-form-item label="">
                <el-input v-model="resource.title"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="textarea" v-model="resource.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发布</el-button>
            </el-form-item>
        </el-form>
        <image-uploader></image-uploader>
    </el-container>
</template>

<script>
    import imageUploader from '@/components/ImageUploader';

    export default {
        name: "PublishResource",
        components: {imageUploader},
        data() {
            return {
                resource: {
                    title: '',
                    content: '',
                },
            }
        },
        methods: {
            onSubmit() {

            },
        }
    }
</script>

<style scoped>

</style>