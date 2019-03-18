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
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: 'HTML',
                    label: 'HTML'
                }, {
                    value: 'CSS',
                    label: 'CSS'
                }, {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }],
                tags: []
            }
        }
    }
</script>

<style scoped>

</style>