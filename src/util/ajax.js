import axios from 'axios'
import store from '@/store'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    get(url, params, succeed = d => {
        console.warn('Unused response.')
    }, rejected = e => {
    }, finallyMethod = () => {
    }) {
        this.request('GET', url, params, null, null, succeed, rejected, finallyMethod);
    },
    post(url, data, succeed = d => {
        console.warn('Unused response.')
    }, rejected = e => {
    }, finallyMethod = () => {
    }) {
        let transformRequest = [
            data => Object.keys(data)
                .map(key => encodeURI(key + '=' + data[key]))
                .reduce((a, b) => a + '&' + b)
        ];
        this.request('POST', url, null, data, {transformRequest}, succeed, rejected, finallyMethod);
    },

    request(method, url, params, data, options, succeed = d => {
        console.warn('Unused response.')
    }, rejected = e => {
    }, finallyMethod = () => {
    }) {
        let config = {url};
        if (method) {
            Object.assign(config, {method});
        }
        if (params) {
            Object.assign(config, {params});
        }
        if (data) {
            Object.assign(config, {data});
        }
        if (options) {
            Object.assign(config, options);
        }

        if (store.state.token) {
            let token = store.state.token;
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Authorization = token;
        }
        axios(config).then(response => {
            succeed(response);
        }).catch(reason => {
            rejected(reason);
        }).finally(() => {
            finallyMethod();
        })
    },
}
