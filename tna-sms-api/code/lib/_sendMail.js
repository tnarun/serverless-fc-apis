const nodemailer = require('nodemailer')

const { 
  SMTP_HOST, 
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS
} = process.env

const { TEXT_TEMPLATE, HTML_TEMPLATE } = require('../templates/template')

const mailTransport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT, // FC 上只能用 80 端口
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
})

const send = async ({ email, code }) => {
  let text = TEXT_TEMPLATE.replace('$code', code)
  let html = HTML_TEMPLATE.replace('$code', code)

  const options = {
    from: `"TNA 速通会"<${ SMTP_USER }>`, // 发信人，可修改
    to: `${ email }`, // 收信人
    subject: `TNA 速通会用户注册验证邮件`, // 邮件标题
    // text: `测试邮件 ${ code }`, // 邮件文字正文
    // html: `测试邮件 ${ code }` // 邮件 html 正文
    text,
    html
  }

  let res = await mailTransport.sendMail(options)
  return res
  // console.log(options)
}

module.exports = send