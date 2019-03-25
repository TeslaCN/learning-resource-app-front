<template>
    <el-form ref="form" :model="newProblem" label-width="100px">
        <el-form-item label="题目标题">
            <el-input v-model="newProblem.problem.title"></el-input>
        </el-form-item>
        <el-form-item label="问题标签">
            <tag-finder @change="tags => newProblem.tags = tags"></tag-finder>
        </el-form-item>
        <el-form-item label="问题描述">
            <el-input type="textarea" v-model="newProblem.problem.description"></el-input>
        </el-form-item>
        <el-form-item label="模板语言">
            <el-select v-model="newProblem.codeTemplate.language" placeholder="编程语言">
                <el-option label="暂未支持其他语言" value="java"></el-option>
                <el-option label="Java" value="java"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="代码模板">
            <pure-code-editor ref="pureCodeEditor"
                              @code="code => newProblem.codeTemplate.template = code"></pure-code-editor>
        </el-form-item>
        <el-form-item label="入口方法">
            <el-input v-model="newProblem.codeTemplate.entryMethod"
                      placeholder="例: 方法签名 public TreeNode convert(TreeNode root, int[] array, String s) {} 则此处填写 convert(TreeNode,int[],String)"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="addTestcase">新增测试用例</el-button>
        </el-form-item>
        <el-form-item v-for="(testcase, index) in newProblem.testcases" :key="index" :label="'测试用例' + (1 + index)">
            <el-tooltip placement="top">
                <span slot="content">
                    参数格式：arg0&arg1&arg2，使用 & 分隔多个参数<br>
                    基本类型直接填写值，数组与对象使用JSON格式<br>
                    例：{"value":10, "left":{"value":8}, "right":{"value":15}}&[1,2,3]&23333
                </span>
                <el-input v-model="testcase.input"></el-input>
            </el-tooltip>
            <el-tooltip placement="top" content="规则同上，但返回值仅1个值">
                <el-input v-model="testcase.expect"></el-input>
            </el-tooltip>
            <el-tooltip placement="top" content="单个用例运行时间限制">
                <el-input v-model.number="testcase.timeout" maxlength="6" style="width: 20%;">
                    <template slot="append">毫秒</template>
                </el-input>
            </el-tooltip>
            <el-button @click.prevent="removeTestcase(testcase)">删除测试用例{{index + 1}}</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import tagFinder from '@/components/TagFinder'
    import pureCodeEditor from '@/components/PureCodeEditor'
    import codingService from '@/service/coding-service'

    export default {
        name: "PublishProblem",
        components: {tagFinder, pureCodeEditor},
        data() {
            return {
                newProblem: {
                    problem: {
                        title: '',
                        description: '',
                    },
                    codeTemplate: {
                        template: '',
                        entryMethod: '',
                        language: 'java',
                    },
                    testcases: [{
                        input: '',
                        expect: '',
                        timeout: 1000,
                    }],
                    tags: [],
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs.pureCodeEditor.useValue();
                codingService.postProblem(this.newProblem, response => {
                    console.log(response);
                });
            },
            addTestcase() {
                this.newProblem.testcases.push({input: '', expect: '', timeout: 1000});
            },
            removeTestcase(testcase) {
                let index = this.newProblem.testcases.indexOf(testcase);
                if (index !== -1) {
                    this.newProblem.testcases.splice(index, 1);
                }
            }
        }
    }
</script>

<style scoped>

</style>