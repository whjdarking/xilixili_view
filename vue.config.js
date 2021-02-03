module.exports = {
    devServer: {
        proxy: '47.242.143.52'//这样只在kubernetes起作用，back-service是后端的dns
        // proxy: 'localhost:3000'
    }
}
