import ajax from '@/util/ajax'
import store from '@/store'

export default {
    signIn(username, password, remember) {
        ajax.post('/login', {username, password, remember}, response => {
            if (response.headers.hasOwnProperty('token')) {
                let token = response.headers.token;
                store.commit('updateToken', {token});
            }
        });
    },
}