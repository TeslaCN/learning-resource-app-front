<template>
    <el-select
            v-model="tags"
            @change="$emit('change', tags)"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择标签">
        <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    import resourceService from '@/service/resource-service'

    export default {
        data() {
            return {
                options: [],
                tags: [],
            }
        },
        methods: {
            fetchTags() {
                resourceService.getAllTags(response => {
                    let tags = response.data.body;
                    let tagObjects = [...new Set(tags)].map(t => {
                        return {value: t, label: t}
                    });
                    this.options.push(...tagObjects);
                });
            },
        },
        mounted() {
            this.fetchTags();
        }
    }
</script>

<style scoped>

</style>