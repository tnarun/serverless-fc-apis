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
  console.log(url)
  let res = await fetch(url, {
    headers: {
      cookie: 'gr_user_id=9da90939-d450-4292-b1f6-10bb98cde5bd; MEIQIA_EXTRA_TRACK_ID=5a13efa0d67511e6953b02fa39e25136; _ga=GA1.2.1889840246.1483970952; intercom-id-o2orsbzq=de0032dc-a87b-4760-b6c3-14c79a953c74; shimo_kong=7; shimo_gatedlaunch=6; shimo_svc_edit=6172; _csrf=K0iEc6iydVAbbP-POi0OlNNz; deviceId=bf12060d-718c-4a37-a2ee-f345573e40a9; deviceIdGenerateTime=1575207204825; sensorsdata2015session=%7B%7D; Hm_lvt_aa63454d48fc9cc8b5bc33dbd7f35f69=1578542909,1578761211; Hm_lpvt_aa63454d48fc9cc8b5bc33dbd7f35f69=1579939568; _bl_uid=hIkd4676b2woUImbsz19hUCvh8Fg; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221322100%22%2C%22%24device_id%22%3A%22160d59d2f6d28b-096d2bed94dbac-163e6657-1296000-160d59d2f6eb5c%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%22160d59d2f6d28b-096d2bed94dbac-163e6657-1296000-160d59d2f6eb5c%22%7D; anonymousUser=-4802388836; shimo_sid=s%3AknD-vBMzuXieqE1HRGk-RaFFx1eAUOwq.jgobLfCul%2FIAFu1OFO%2Btj1hmuQNZOBVoidX0MzqNQec'
    }
  })
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