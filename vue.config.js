module.exports = {
    devServer: {
        proxy: 'http://back-service'
    }
}
//这样只在kubernetes起作用，back-service是后端的dns