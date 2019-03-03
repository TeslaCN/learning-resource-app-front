import ajax from '@/util/ajax'

export default {
    getProblem(title, done) {
        ajax.get(`/problem/' + ${title}`, {}, done);
    },
}