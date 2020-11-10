require('./env')

const moment = require('moment')

const OSS = require('ali-oss')
const ossClient = new OSS({
  "region": process.env.SIBBAY_OSS_REGION,
  "bucket": process.env.SIBBAY_OSS_WEB_TUI_BUCKET_NAME,
  "accessKeyId": process.env.SIBBAY_OSS_ACCESS_KEY_ID,
  "accessKeySecret": process.env.SIBBAY_OSS_ACCESS_KEY_SECRET
})

const api = require('./lib/api')

const func = async () => {
  let list = await api.getList()
  let now = new Date()
  let stamp = now.getTime()
  let time = moment(now).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')

  let data = { stamp, time, list }

  let fileKey = `afdian-data/${time}-${stamp}-data.json`
  let newestFileKey = `afdian-data/newest.json`
  await ossClient.put(fileKey, new Buffer(JSON.stringify(data)))
  await ossClient.put(newestFileKey, new Buffer(JSON.stringify(data)))
  return data
}

module.exports.handler = (event, context, callback) => {
  console.log(new String(event))
  func().then((data) => {
    callback(null, data)
  })
}