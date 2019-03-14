<template>
    <div>
        <div id="editor"></div>
        <modal v-show="isModalVisible" @close="isModalVisible = false">
            <div slot="header">
                <span>设置插入图片像素</span>
            </div>
            <div slot="body" v-loading="loadingImage">
                <el-switch v-model="autoOrient" inactive-text="不旋转" active-text="自动旋转"></el-switch>
                <el-slider v-model="scale" :min="1" show-input></el-slider>
                <el-input label="宽度" v-model="width">
                    <div slot="append">像素</div>
                </el-input>
                <el-input label="高度" v-model="height">
                    <div slot="append">像素</div>
                </el-input>
                <div style="text-align: center">
                    <img v-if="file" :src="fileUrl"
                         :style="{width: width + 'px', height: height + 'px', maxHeight: maxHeight + 'px', maxWidth: maxWidth + 'px'}">
                </div>
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
                autoOrient: true,
                autoOrientSuffix: '?x-oss-process=style/auto-orient',
            }
        },
        computed: {
            maxWidth() {
                return document.body.clientWidth * 0.9;
            },
            maxHeight() {
                return document.body.clientHeight * 0.8;
            },
            sizeExceed() {
                return this.width > this.maxWidth || this.height > this.maxHeight;
            },
            fileUrl() {
                return this.file ? this.file.url + (this.autoOrient ? this.autoOrientSuffix : '') : '';
            },
            finalHtml() {
                return `<img src="${this.fileUrl}" style="width: ${this.width}px; height: ${this.height}px;">`;
            },
            allowMax() {
                return this.maxHeight / this.maxWidth > this.originHeight / this.originWidth
                    ?
                    {
                        width: this.maxWidth,
                        height: this.originHeight * (this.maxWidth / this.originWidth),
                    }
                    :
                    {
                        width: this.originWidth * (this.maxHeight / this.originHeight),
                        height: this.maxHeight,
                    }
            }
        },
        watch: {
            scale() {
                let rate = this.scale / 100;
                this.width = Math.round(this.originWidth * rate);
                this.height = Math.round(this.originHeight * rate);
            },
            autoOrient() {
                this.onAdd(this.file);
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
                    img.src = this.fileUrl;
                    img.onload = () => {
                        this.originWidth = img.width;
                        this.originHeight = img.height;
                        this.height = this.allowMax.height;
                        this.width = this.allowMax.width;
                        this.scale = this.height / this.originHeight * 100;
                        this.loadingImage = false;
                    };
                } else {
                    let attachHtml = ``;
                    this.editor.setContent(attachHtml, true);
                }
            },
            confirmAdd() {
                this.isModalVisible = false;
                let html = this.finalHtml;
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