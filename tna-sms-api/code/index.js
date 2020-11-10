const Router = require('url-router')
const util = require('util')
const { getJsonBody, respJSON } = require('ben7th-fc-utils')

require('./env')
const SMS = require('./lib/sms')

const router = new Router([
  // POST
  // 发送注册验证码
  ['/sendRegCheckCode', async ({ req, resp, route }) => {
    let { body } = await getJsonBody({ req, resp })
    let { phoneNumber } = body
    let sms = new SMS()
    let res = await sms.sendRegCheckCode({ phoneNumber })
    return { phoneNumber, res }
  }],

  // POST
  // 检查注册验证码
  ['/checkRegCheckCode', async ({ req, resp, route }) => {
    let { body } = await getJsonBody({ req, resp })
    let { phoneNumber, code } = body
    let sms = new SMS()
    let res = await sms.checkRegCheckCode({ phoneNumber, code })
    return { res }
  }],
])

module.exports.handler = (req, resp, context) => {
  // let params = {
  //   path: req.path,
  //   queries: req.queries,
  //   headers: req.headers,
  //   method : req.method,
  //   requestURI : req.url,
  //   clientIP : req.clientIP,
  // }

  let route = router.find(req.path)

  if (route) {
    route.handler({ req, resp, route })
      .then(data => respJSON(resp, { data }))
      .catch(e => {
         resp.setStatusCode(500)
         respJSON(resp, { error: util.inspect(e).split(`\n`) })
       })
    return
  }

  resp.setStatusCode(404)
  respJSON(resp, { error: 'no such API PATH', path: req.path })
}