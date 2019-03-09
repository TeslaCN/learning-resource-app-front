import ajax from '@/util/ajax'

export default {
    getProblem(title, done) {
        ajax.get(`/problem/${title}`, {}, done);
    },
    getTemplate(title, language, done) {
        ajax.get(`/problem/${title}/${language}`, {}, done);
    },
    submit(title, language, code, entryMethod, done) {
        ajax.post('/judge', {title, language, code, entryMethod}, done);
    },
    getProblemList(page, pageSize, done) {
        ajax.get('/problem', {page: --page, pageSize}, done);
    }
}