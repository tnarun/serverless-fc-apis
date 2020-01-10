const util = require('util')
const fetch = require('node-fetch')

const { respJSON } = require('ben7th-fc-utils')

// usage: /shimo/formdata/?formGuid=tGlSvtsqiJgno3Yn

/*
网页上获取表头的脚本：

JSON.stringify($$('input[class^=SubjectInput]').map((x, idx) => ({ idx, id: x.id, name: x.value })), null, 2)
*/

// formGuid like tGlSvtsqiJgno3Yn
const getShimoFormData = async ({ formGuid, offset = 0, limit = 1000000 }) => {
  let url = `https://shimo.im/api/newforms/forms/${ formGuid }/responses?offset=${ offset }&limit=${ limit }`
  let res = await fetch(url)
  let data = await res.json()

  for (let d of data.responses) {
    d.data = JSON.parse(d.content)
  }

  return data
}

module.exports.handler = (req, resp, context) => {
  let params = {
    path: req.path,
    queries: req.queries,
    headers: req.headers,
    method : req.method,
    requestURI : req.url,
    clientIP : req.clientIP,
  }

  let { formGuid } = req.queries

  getShimoFormData({ formGuid })
    .then(data => {
      respJSON(resp, { data, params })
    })
    .catch(e => {
      respJSON(resp, { error: util.inspect(e).split(`\n`) })
    })
}