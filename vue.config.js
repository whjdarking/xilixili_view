module.exports = {
    devServer: {
        proxy: 'localhost:3000'//在kubernetes（容器打包后）不起作用，在kubernetes内利用ingress等分配前后端路由

    }
}
