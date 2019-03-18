import ajax from '@/util/ajax'

export default {
    getResource(resourceId, done) {
        ajax.get(`/resource/${resourceId}`, null, done);
    },
    postResource(resource, done) {
        ajax.post('/resource', resource, done);
    },
    getTags(done) {
        ajax.get('/tags', undefined, done);
    },
    getAllTags(done) {
        ajax.get('/all-tags', undefined, done);
    },
    getFiles(dateString, done) {
        ajax.get('/oss/list', {prefix: dateString}, done);
    },
}
