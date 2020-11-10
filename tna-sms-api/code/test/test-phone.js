const SMS = require('../lib/sms')

const run = async () => {
  let sms = new SMS()

  // 发信测试
  // let res = await sms.sendRegCheckCode({ phoneNumber: '13811174717' })
  // console.log(res)

  // 验证码检查
  let isValid = await sms.checkRegCheckCode({ phoneNumber: '13811174717', code: '2710' })
  console.log(isValid)
}

run().then()