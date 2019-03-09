<template>
    <div>
        <div ref="ace"></div>
        <el-input v-model="entryMethod"></el-input>
        <el-button type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
    import ace from 'ace-builds'
    import 'ace-builds/webpack-resolver'
    import 'ace-builds/src-noconflict/ext-language_tools'
    import 'ace-builds/src-noconflict/theme-chrome'
    import 'ace-builds/src-noconflict/mode-java'
    import 'ace-builds/src-noconflict/snippets/java'
    import 'ace-builds/src-noconflict/ext-error_marker'
    import 'ace-builds/src-noconflict/keybinding-vim'
    import codingService from '@/service/coding-service'

    export default {
        name: "CodeEditor",
        props: {
            language: String,
        },
        data() {
            return {
                aceEditor: null,
                themePath: 'ace/theme/chrome',
                modePath: 'ace/mode/java',
                codeTemplate: '',
                entryMethod: '',
            }
        },
        computed: {
            title() {
                return this.$route.params.title;
            },
        },

        methods: {
            submit() {
                let code = this.aceEditor.getValue();
                let entryMethod = this.entryMethod;
                this.$emit('submit', {code, entryMethod});
            }
        },
        mounted() {
            let editor = ace.edit(this.$refs.ace, {
                maxLines: 30,
                minLines: 10,
                fontSize: 14,
                theme: this.themePath,
                mode: this.modePath,
                tabSize: 4,
            });
            editor.setOptions({
                enableSnippets: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true
            });
            // editor.setKeyboardHandler('ace/keyboard/vim');
            this.aceEditor = editor;
            codingService.getTemplate(this.title, this.language, response => {
                let template = response.data.body.template;
                let entryMethod = response.data.body.entryMethod;
                this.codeTemplate = template;
                this.entryMethod = entryMethod;
                editor.setValue(template);
            })
        },
    }
</script>

<style scoped>

</style>