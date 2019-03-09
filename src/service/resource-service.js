import ajax from '@/util/ajax'

export default {
    getResource(resourceId, done) {
        ajax.get(`/resource/${resourceId}`, null, done);
    },
    postResource(resource, done) {
        ajax.post('/resource', resource, done);
    },
}
