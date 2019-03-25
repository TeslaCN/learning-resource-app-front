<template>
    <div v-if="code">
        <div ref="ace"></div>
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

    export default {
        name: "CodeView",
        props: {
            code: String,
        },
        data() {
            return {
                aceEditor: null,
                themePath: 'ace/theme/chrome',
                modePath: 'ace/mode/java',
            }
        },
        watch: {
            code() {
                this.newEditorAndSet();
            }
        },
        methods: {
            newEditorAndSet() {
                let editor = ace.edit(this.$refs.ace, {
                    maxLines: 1024,
                    minLines: 10,
                    fontSize: 14,
                    theme: this.themePath,
                    mode: this.modePath,
                    tabSize: 4,
                    readOnly: true,
                    autoScrollEditorIntoView: true,
                });
                editor.setOptions({
                    enableSnippets: true,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true
                });
                this.aceEditor = editor;
                editor.setValue(this.code);
                editor.resize();
            }
        },
        mounted() {
            this.newEditorAndSet();
        },
    }
</script>

<style scoped>

</style>
