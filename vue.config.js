const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // 目标服务器的地址
        changeOrigin: true, // 是否更改源头
        pathRewrite: { "^/api": "" }, // 重写路径，将请求中/api替换为目标地址
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("thejs")
      .test(/\.js$/)
      .include.add(path.resolve("src"))
      .add(path.resolve("node_modules/element-ui/packages"))
      .end()
      .use("babel-loader")
      .loader("babel-loader")
      .end();
  },
};
