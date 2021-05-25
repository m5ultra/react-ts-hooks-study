/* craco.config.js */
const CracoLessPlugin = require("craco-less");
// https://ant.design/docs/react/customize-theme-cn 主题变量 modifyVars可以配置的变量
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(0, 82, 204)",
              "@font-size-base": "16px"
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
