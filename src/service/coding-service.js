import ajax from '@/util/ajax'

export default {
    getProblemById(id, done) {
        ajax.get(`/problem-id/${id}`, undefined, done);
    },
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
    },
    getSubmissions(userId, problemId = null, done, rejected, finallyMethod) {
        ajax.get('/submission', {userId, problemId}, done, rejected, finallyMethod);
    },
    getSubmissionDetail(submissionId, done) {
        ajax.get(`/submission/${submissionId}`, undefined, done);
    },
    postProblem(newProblem, done) {
        ajax.postBody('/problem', newProblem, done);
    },
    getProblemTags(problemId, done, rejected, finallyMethod) {
        ajax.get('/problem-tags', {problemId}, done, rejected, finallyMethod);
    },
    getProblemsByTags(tags, done, rejected, finallyMethod) {
        ajax.postBody('/problem-by-tags', tags, done, rejected, finallyMethod);
    },
}