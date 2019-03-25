<template>
    <div>
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
    import 'ace-builds/src-noconflict/keybinding-vim'

    export default {
        name: "PureCodeEditor",
        props: {
            language: String,
        },
        data() {
            return {
                aceEditor: null,
                themePath: 'ace/theme/chrome',
                modePath: 'ace/mode/java',
            }
        },
        computed: {
        },
        methods: {
            useValue() {
                this.$emit('code', this.aceEditor.getValue());
            }
        },
        mounted() {
            let editor = ace.edit(this.$refs.ace, {
                maxLines: 1024,
                minLines: 10,
                fontSize: 14,
                theme: this.themePath,
                mode: this.modePath,
                tabSize: 4,
                autoScrollEditorIntoView: true,
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