module.exports = {
    devServer: {
        proxy: 'http://localhost:3000'//开发环境有效，把后端部署在3000端口即可
        // 在kubernetes（容器打包后）不起作用，在kubernetes内利用ingress等分配前后端路由

    }
}
