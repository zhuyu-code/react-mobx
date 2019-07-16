const { override,addLessLoader,fixBabelImports, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(
    addDecoratorsLegacy(),
    addLessLoader({
      javascriptEnabled:true,
      modifyVars:{
        "@primary-color":"#0ff"
      }
      }),
      fixBabelImports("import",{
        "libraryName":"choerodon-ui",
        "libraryDirectory":"es",
        "style":true
      })
);