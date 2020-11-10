const TEXT_TEMPLATE = `
你好，欢迎加入 TNA 速通会，和中文地区核玩游戏社区一起进步 :)
这是一封自动发送的邮箱验证邮件，以下是四位数字验证码：

>>> $code <<<

请在注册界面输入上述验证码，以继续注册过程。
祝你玩游戏开心 ~

来自 https://board.tnarun.com

----------------

如果你并没有在 TNA 速通会网站注册，请无视这封邮件。
`

const HTML_TEMPLATE = `
<div style='font-size: 1em'>
  <p>
    你好，欢迎加入 TNA 速通会，和中文地区核玩游戏社区一起进步 :)<br/>
    这是一封自动发送的邮箱验证邮件，以下是四位数字验证码：
  </p>
  <p style='font-size: 2em; font-weight: bold'>$code</p>
  <p>
    请在注册界面输入上述验证码，以继续注册过程。<br/>
    祝你玩游戏开心 ~<br/><br/>
    来自 <a href='https://board.tnarun.com'>https://board.tnarun.com</a>
  </p>
  <p>----------------</p>
  <p>如果你并没有在 TNA 速通会网站注册，请无视这封邮件。</p>
</div>
`

module.exports = { TEXT_TEMPLATE, HTML_TEMPLATE }