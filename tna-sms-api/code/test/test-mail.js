const Mail = require('../lib/mail')

const run = async () => {
  let mail = new Mail()

  // 发信测试
  // let res = await mail.sendRegCheckCode({ email: 'ben7th@126.com' })
  // console.log(res)
  
  // 验证码检查
  let isValid = await mail.checkRegCheckCode({ email: 'ben7th@126.com', code: '6441' })
  console.log(isValid)
}

run().then()