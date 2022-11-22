const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}
 
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      fileName: 'index.html'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
    .set('@', resolve('examples')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    .set('_c', resolve('examples/components'))
    config.module
    .rule('js')
    .include.add(resolve('/packages')).end()
    .use('babel').loader('babel-loader').tap(options=>{return options});
  },
  productionSourceMap: false, 
  css: { extract: false }
}
