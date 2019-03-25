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
    getSubmissions(userId, problemId = null, done) {
        ajax.get('/submission', {userId, problemId}, done);
    },
    getSubmissionDetail(submissionId, done) {
        ajax.get(`/submission/${submissionId}`, undefined, done);
    },
    postProblem(newProblem, done) {
        let options = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(newProblem),
        };
        ajax.request('POST', '/problem', null, null, options, done);
    }
}