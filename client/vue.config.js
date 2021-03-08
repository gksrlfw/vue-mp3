module.exports = {
  devServer: { // ① api 요청이 있을때 어디에서 처리할지를 설정
    // proxy: 'http://localhost:8001/'
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
}