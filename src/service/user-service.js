import ajax from '@/util/ajax'
import store from '@/store'

export default {
    signIn(form, done) {
        ajax.post('/login', form, done);
    },
    signUp(form, done, rejected, finallyMethod) {
        ajax.post('/user', form, done, rejected, finallyMethod);
    },
    postHistory(url, external, done) {
        ajax.post('/history', {url, external}, done);
    }
}