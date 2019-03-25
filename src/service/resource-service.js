import ajax from '@/util/ajax'

export default {
    getResource(resourceId, done) {
        ajax.get(`/resource/${resourceId}`, null, done);
    },
    postResource(resource, done) {
        let options = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(resource),
        };
        ajax.request('POST', '/resource', null, null, options, done);
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
