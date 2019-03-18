<template>
    <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
            :select-when-unmatched="true"
            :trigger-on-focus="false"
            clearable
    ></el-autocomplete>
</template>

<script>
    import searchService from '@/service/search-service';

    export default {
        name: 'finder',
        data() {
            return {
                suggestions: [],
                input: '',
                timeout: null,
            }
        },
        methods: {
            querySearchAsync(queryString, cb) {
                if (!queryString) {
                    return;
                }
                this.suggestions = [];
                let suggestions = this.suggestions;
                searchService.getCompletionSuggestions(queryString, response => {
                    suggestions.push(...response.data.body.map(value => Object.assign({}, {value})));
                    console.debug(suggestions);
                    cb(suggestions);
                });
            },
            handleSelect(item) {
                this.$emit('confirm', item.value);
                console.debug('Selected:' + item.value);
            }
        },
    };
</script>

<style scoped>
</style>

