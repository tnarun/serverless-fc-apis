require('../env')

const ossClient = require('./ossClient')
const _genCode = require('./_genCode')
const _sendMail = require('./_sendMail')

const genFileKey = ({ email }) => {
  return `tna-web-store/email-codes/${ email }.json`
}

const _saveCodeToOSS = async ({ email, code }) => {
  let fileKey = genFileKey({ email })
  let data = { email, code, sendAt: new Date().toISOString() }
  await ossClient.put(fileKey, Buffer.from(JSON.stringify(data)))
}

const _checkFromOSS = async ({ email, code }) => {
  try {
    let fileKey = genFileKey({ email })
    let res = await ossClient.get(fileKey)
    let data = JSON.parse(new String(res.content))
    console.log(data)
    return code === data.code
  } catch (e) {
    return false
  }
}

class Mail {
  // 发送注册验证邮件
  async sendRegCheckCode ({ email }) {
    let code = _genCode()
    await _saveCodeToOSS({ email, code })
    let res = await _sendMail({ email, code })
    return { email, code, res }
  }

  // 检查注册验证邮件是否匹配
  async checkRegCheckCode ({ email, code }) {
    return await _checkFromOSS({ email, code })
  }
}

module.exports = Mail