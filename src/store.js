import Vue from 'vue'
import Vuex from 'vuex'
import persist from '@/util/persist'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: null,
        token: '',
    },
    getters: {
        isSignedIn(state) {
            return state.userInfo !== null && state.token !== '';
        },
        userRoles(state) {
            return state.userInfo ? state.userInfo.authorities.map(a => a.authority) : [];
        },
        userId(state) {
            return state.userInfo ? state.userInfo.id : null;
        }
    },
    mutations: {
        updateToken(state, payload) {
            state.token = payload.token;
            persist.persistToken();
        },
        updateUserInfo(state, payload) {
            state.userInfo = payload.userInfo;
            persist.persistUserInfo();
        },
        signOut(state) {
            state.userInfo = null;
            state.token = '';
            persist.removeAll();
        }
    },
    actions: {},
})
