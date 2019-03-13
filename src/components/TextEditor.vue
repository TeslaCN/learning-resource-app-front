<template>
    <div>
        <div id="editor"></div>
        <modal v-show="isModalVisible" @close="isModalVisible = false">
            <div slot="header">设置插入图片像素</div>
            <div slot="body" v-loading="loadingImage">
                <el-slider v-model="scale" :min="1" show-input></el-slider>
                <el-input label="宽度" v-model="width">
                    <div slot="append">像素</div>
                </el-input>
                <el-input label="高度" v-model="height">
                    <div slot="append">像素</div>
                </el-input>
                <img v-if="file" :src="file.url" :style="{width: width + 'px', height: height + 'px', maxHeight: '100%'}">
            </div>
            <div slot="footer">
                <el-button type="primary" @click="confirmAdd">插入</el-button>
            </div>
        </modal>
        <uploader ref="uploader" @uploaded="onUploaded"></uploader>
        <file-selector ref="fileSelector" @add="onAdd"></file-selector>
        <el-button type="primary" @click="onSubmit">发布</el-button>
    </div>
</template>

<script>
    import '@/../public/static/ueditor/ueditor.config'
    import '@/../public/static/ueditor/ueditor.all'
    import '@/../public/static/ueditor/lang/zh-cn/zh-cn'
    import uploader from './Uploader'
    import fileSelector from './FileSelector'
    import modal from './Modal'

    export default {
        name: "TextEditor",
        components: {uploader, fileSelector, modal},

        data() {
            return {
                editor: null,
                imagePattern: /.*\.(jpg|png|gif|bmp)$/,
                originWidth: 0,
                originHeight: 0,
                width: 0,
                height: 0,
                html: '',
                isModalVisible: false,
                file: null,
                loadingImage: false,
                scale: 100,
            }
        },
        watch: {
            scale() {
                let rate = this.scale / 100;
                this.width = Math.round(this.originWidth * rate);
                this.height = Math.round(this.originHeight * rate);
            }
        },
        methods: {
            onSubmit() {
                let content = this.editor.getContent();
                this.$emit('submit', {content});
            },
            onUploaded(file) {
                this.$refs.fileSelector.loadFiles();
            },
            onAdd(file) {
                this.file = file;
                if (this.imagePattern.test(file.filename)) {
                    this.isModalVisible = true;
                    this.loadingImage = true;
                    let img = new Image();
                    img.src = file.url;
                    img.onload = () => {
                        this.width = this.originWidth = img.width;
                        this.height = this.originHeight = img.height;
                        this.loadingImage = false;
                    };
                } else {
                    let attachHtml = ``;
                    this.editor.setContent(attachHtml, true);
                }
            },
            confirmAdd() {
                this.isModalVisible = false;
                let html = `<img src="${this.file.url}" style="width: ${this.width}px; height: ${this.height}px;">`
                this.editor.setContent(html, true);
            },
        },
        mounted() {
            this.editor = UE.getEditor('editor', {
                autoHeight: true,
            });
        },
        destroyed() {
            this.editor.destroy();
        }
    }
</script>

<style scoped>

</style>