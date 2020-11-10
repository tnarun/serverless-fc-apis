const { getJsonBody } = require('ben7th-fc-utils')
const SMS = require('../lib/sms')

module.exports = [
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
  }]
]