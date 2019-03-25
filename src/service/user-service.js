import ajax from '@/util/ajax'
import store from '@/store'

export default {
    signIn(form, done, rejected, finallyMethod) {
        ajax.post('/login', form, done, rejected, finallyMethod);
    },
    signUp(form, done, rejected, finallyMethod) {
        ajax.post('/user', form, done, rejected, finallyMethod);
    },
    postHistory(title, url, external, done) {
        ajax.post('/history', {title, url, external}, done);
    },
    getHistories(userId, done) {
        ajax.get('/history', {userId}, done);
    }
}