<template>
    <div>
        <el-tooltip class="item" effect="dark" content="支持拼音，多个关键词空格分隔" placement="right">
            <el-autocomplete
                    v-model="input"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    :select-when-unmatched="true"
                    :trigger-on-focus="false"
                    clearable
            ></el-autocomplete>
        </el-tooltip>
        <div v-if="correctionSuggestions.length > 0">
            您是不是要找:
            <el-tag v-for="s in correctionSuggestions" :key="s"><a @click="tagClicked(s)">{{s}}</a></el-tag>
        </div>
    </div>
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
                correctionSuggestions: [],
            }
        },
        methods: {
            querySearchAsync(queryString, cb) {
                if (!queryString) {
                    return;
                }
                let suggestions = this.suggestions;
                searchService.getCompletionSuggestions(queryString, response => {
                    suggestions.length = 0;
                    suggestions.push(...response.data.body.map(value => Object.assign({}, {value})));
                    console.debug(suggestions);
                    cb(suggestions);
                });
                let correctionSuggestions = this.correctionSuggestions;
                correctionSuggestions.length = 0;
                searchService.getPhraseSuggestions(queryString, response => {
                    correctionSuggestions.push(...response.data.body);
                    searchService.getTermSuggestions(queryString, response => {
                        correctionSuggestions.push(...response.data.body.filter(x => !correctionSuggestions.includes(x)));
                    });
                });
            },
            handleSelect(item) {
                this.$emit('confirm', item.value);
                console.debug('Selected:' + item.value);
            },
            tagClicked(tag) {
                console.log('Clicked tag: ' + tag);
                this.input = tag;
                this.handleSelect({value: tag});
            },
        },
        mounted() {
            let text = this.$route.params.text;
            if (text) {
                this.input = text;
                this.handleSelect({value: text});
            }
        }
    };
</script>

<style scoped>
</style>

