const SMS = require('../lib/sms')

const run = async () => {
  let sms = new SMS()
  // new SMS().sendRegCheckCode()
  let isValid = await sms.checkRegCheckCode({ phoneNumber: '13811174717', code: '6058' })
  console.log(isValid)
}

run().then()