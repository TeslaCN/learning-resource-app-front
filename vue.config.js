module.exports = {
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 10000,
        proxy: 'http://127.0.0.1:10001'
        // proxy: 'http://x.scau.ltd:10001',
    }
};