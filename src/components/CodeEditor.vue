<template>
    <div>
        <div ref="ace"></div>
    </div>
</template>

<script>
    import ace from 'ace-builds'
    import 'ace-builds/webpack-resolver'
    import 'ace-builds/src-noconflict/ext-language_tools'
    import 'ace-builds/src-noconflict/theme-monokai'
    import 'ace-builds/src-noconflict/mode-java'
    import 'ace-builds/src-noconflict/snippets/java'
    import 'ace-builds/src-noconflict/ext-error_marker'
    import 'ace-builds/src-noconflict/keybinding-vim'

    export default {
        name: "CodeEditor",

        data() {
            return {
                aceEditor: null,
                themePath: 'ace/theme/monokai',
                modePath: 'ace/mode/java',
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
        },
    }
</script>

<style scoped>

</style>