import store from '@/store'

export default {
    persistUserInfo() {
        let userInfo = store.state.userInfo;
        if (userInfo) {
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
    },
    restoreUserInfo() {
        let value = window.localStorage.getItem('userInfo');
        if (value) {
            let userInfo = JSON.parse(value);
            store.commit('updateUserInfo', {userInfo});
        }
    },
    persistToken() {
        let token = store.state.token;
        if (token) {
            console.log('Persist Token.');
            window.localStorage.setItem('token', token);
        }
    },
    restoreToken() {
        let token = window.localStorage.getItem('token');
        if (token) {
            console.log('Token found.');
            store.commit('updateToken', {token});
        }
    },
    removeAll() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userInfo');
    }
}