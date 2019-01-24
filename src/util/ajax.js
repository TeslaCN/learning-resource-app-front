import axios from 'axios'

export default {
    get(url, data, succeed = d => {
        console.warn('Unused response.')
    }, reject = e => {
    }, finallyMethod = () => {
    }) {
        axios.get(data ?
            url + '?' + Object.keys(data)
                .map(key => encodeURI(key + '=' + data[key]))
                .reduce((a, b) => a + '&' + b)
            : url
        ).then(response => {
            succeed(response);
        }).catch(reason => {
            reject(reason);
        }).finally(() => {
            finallyMethod();
        })
    },
}
