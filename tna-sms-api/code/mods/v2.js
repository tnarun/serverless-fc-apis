const { getJsonBody } = require('ben7th-fc-utils')
const SMS = require('../lib/sms')
const Mail = require('../lib/mail')

module.exports = [
  // POST
  // v2 发送短信注册验证码
  ['/v2/sendPhoneCode', async ({ req, resp, route }) => {
    let { body } = await getJsonBody({ req, resp })
    let { phoneNumber } = body
    let sms = new SMS()
    let res = await sms.sendRegCheckCode({ phoneNumber })
    return { phoneNumber, res }
  }],

  // POST
  // v2 检查短信注册验证码
  ['/v2/checkPhoneCode', async ({ req, resp, route }) => {
    let { body } = await getJsonBody({ req, resp })
    let { phoneNumber, code } = body
    let sms = new SMS()
    let res = await sms.checkRegCheckCode({ phoneNumber, code })
    return { res }
  }],

  // POST
  // v2 发送邮件注册验证码
  ['/v2/sendMailCode', async ({ req, resp, route }) => {
    let { body } = await getJsonBody({ req, resp })
    let { email } = body
    let mail = new Mail()
    let res = await mail.sendRegCheckCode({ email })
    return { email, res }
  }],

  // POST
  // v2 检查邮件注册验证码
  ['/v2/checkMailCode', async ({ req, resp, route }) => {
    let { body } = await getJsonBody({ req, resp })
    let { email, code } = body
    let mail = new Mail()
    let res = await mail.checkRegCheckCode({ email, code })
    return { res }
  }]
]