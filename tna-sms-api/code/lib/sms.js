require('../env')

const ossClient = require('./ossClient')
const Core = require('@alicloud/pop-core')
const _genCode = require('./_genCode')

// API 参考：
// https://help.aliyun.com/document_detail/57458.html?spm=a2c4g.11186623.6.685.1b76545dAMVEaR
const client = new Core({
  accessKeyId: process.env.SIBBAY_OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.SIBBAY_OSS_ACCESS_KEY_SECRET,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
})

const _sendCode = async ({ phoneNumber, code }) => {
  let params = {
    "RegionId": "cn-hangzhou",
    "PhoneNumbers": phoneNumber,
    "SignName": process.env.SMS_SIGN_NAME,
    "TemplateCode": process.env.SMS_TEMPLATE_CODE,
    "TemplateParam": JSON.stringify({ code })
  }

  let requestOption = {
    method: 'POST'
  }

  let result = await client.request('SendSms', params, requestOption)
  console.log(JSON.stringify(result))
  return result
}

const _saveCodeToOSS = async ({ phoneNumber, code }) => {
  let fileKey = `tna-web-store/sms-codes/${phoneNumber}.json`
  let data = { phoneNumber, code, sendAt: new Date().getTime() }
  await ossClient.put(fileKey, Buffer.from(JSON.stringify(data)))
}

const _checkFromOSS = async ({ phoneNumber, code }) => {
  try {
    let fileKey = `tna-web-store/sms-codes/${phoneNumber}.json`
    let res = await ossClient.get(fileKey)
    let data = JSON.parse(new String(res.content))
    return code === data.code
  } catch (e) {
    return false
  }
}

class SMS {
  // 发送注册验证短信
  async sendRegCheckCode ({ phoneNumber }) {
    let code = _genCode()
    await _saveCodeToOSS({ phoneNumber, code })
    return await _sendCode({ phoneNumber, code })
  }

  // 检查注册验证短信是否匹配
  async checkRegCheckCode ({ phoneNumber, code }) {
    return await _checkFromOSS({ phoneNumber, code })
  }
}

module.exports = SMS