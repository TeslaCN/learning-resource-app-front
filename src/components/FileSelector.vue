<template>
    <div class="block">
        <el-date-picker
                v-model="value"
                type="date"
                placeholder="选择日期"
                :clearable="false"
                :picker-options="pickerOptions">
        </el-date-picker>
        <el-row>
            <el-col v-for="file in files" :key="file.url" :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                <el-card :body-style="{ padding: '0px', margin: '0px' }" shadow="hover">
                    <div v-if="isImageSuffix(file.filename)" style="text-align: center">
                        <a :href="file.url" target="_blank"><img style="margin: 0 auto;"
                                                                 :src="file.url + thumbnailSuffix" :alt="file.filename"></a>
                    </div>
                    <!--<div v-else><a target="_blank" :href="file.url">{{file.filename}}</a></div>-->
                    <div style="padding: 14px;">
                        <span><a :href="file.url" target="_blank">{{file.filename}}</a></span>
                        <div class="bottom clearfix">
                            <span>{{formatSize(file.size)}}</span><br>
                            <el-button type="text" class="button" @click="onSelected(file)">加入正文</el-button>
                        </div>
                    </div>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import resourceService from '@/service/resource-service'

    export default {
        name: "FileSelector",
        data() {
            return {
                value: new Date(),
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                files: [],
                imagePattern: /.*\.(jpg|png|gif|bmp)$/,
                thumbnailSuffix: '?x-oss-process=style/thumbnail',
            }
        },
        computed: {
            formatedDate() {
                return this.value.format('yyyyMMdd');
            }
        },
        watch: {
            value() {
                this.loadFiles();
            }
        },
        methods: {
            loadFiles() {
                let files = this.files;
                resourceService.getFiles(this.formatedDate, response => {
                    files.length = 0;
                    files.push(...response.data.body);
                })
            },
            isImageSuffix(filename) {
                return this.imagePattern.test(filename);
            },
            onSelected(file) {
                this.$emit('add', file);
            },
            formatSize(size) {
                if (size === undefined || /\D/.test(size)) {
                    return 'N/A';
                }
                let round = (num, precision) => {
                    return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
                };
                let boundary = Math.pow(1024, 4);
                // TB
                if (size > boundary) {
                    return round(size / boundary, 1) + " " + 'TB';
                }
                // GB
                if (size > (boundary /= 1024)) {
                    return round(size / boundary, 1) + " " + 'GB';
                }
                // MB
                if (size > (boundary /= 1024)) {
                    return round(size / boundary, 1) + " " + 'MB';
                }
                // KB
                if (size > 1024) {
                    return Math.round(size / 1024) + " " + 'KB';
                }
                return size + " " + 'B';
            },
        },
        mounted() {
            this.loadFiles();
        }
    }
</script>

<style scoped>

</style>