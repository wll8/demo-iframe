const fs = require(`fs`)

/**
 * @see: https://www.hongqiye.com/doc/mockm/config/option.html
 * @type {import('mockm/@types/config').Config}
 */
module.exports = util => {
  return  {
    port: 9000,
    testPort: 9005,
    replayPort: 9001,

    // 代理后端的接口, 如果没有可以不填
    proxy: {
      '/': `https://httpbin.org/`,
    },
    api: {
      '/flasgger_static/lib/jquery.min.js'(req, res, next) {
        let jquery = fs.readFileSync(`./node_modules/jquery/dist/jquery.js`, `utf8`)
        let contentWindow = fs.readFileSync(`./node_modules/iframe-resizer/js/iframeResizer.contentWindow.js`, `utf8`)
        const text = `
          ;${jquery}
          ;console.log("加载了")
          ;window.iFrameResizer = {
            onMessage(js) {
              console.log("js", js)
              eval(js)
            }
          }
          ;${contentWindow}
        `
        res.send(text)
      }
    },

  }
}