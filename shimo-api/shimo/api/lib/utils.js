const fetch = require('node-fetch')

const ENDPOINT = 'https://shimo.im/api/newforms/forms'

const fs = require('fs')
const COOKIE = 'gr_user_id=9da90939-d450-4292-b1f6-10bb98cde5bd; MEIQIA_EXTRA_TRACK_ID=5a13efa0d67511e6953b02fa39e25136; _ga=GA1.2.1889840246.1483970952; intercom-id-o2orsbzq=de0032dc-a87b-4760-b6c3-14c79a953c74; shimo_kong=7; shimo_gatedlaunch=6; shimo_svc_edit=6172; _bl_uid=hIkd4676b2woUImbsz19hUCvh8Fg; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221322100%22%2C%22%24device_id%22%3A%22160d59d2f6d28b-096d2bed94dbac-163e6657-1296000-160d59d2f6eb5c%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%22160d59d2f6d28b-096d2bed94dbac-163e6657-1296000-160d59d2f6eb5c%22%7D; _csrf=x_qrIeHwtkDKzF8t2A9DwT8Q; deviceId=d81bcf3a-a69a-4c7e-9e27-e77a098a8d65; deviceIdGenerateTime=1590930710661; sensorsdata2015session=%7B%7D; anonymousUser=-8105218315; shimo_sid=s%3ATF7gKCG1JIo9_gxsz0_pz0wfVcbAciwU.Yzzo64Y%2BFxx2m6YmITagPNreFEU%2BASMrrdgifdmG91o; Hm_lvt_aa63454d48fc9cc8b5bc33dbd7f35f69=1593800751; Hm_lpvt_aa63454d48fc9cc8b5bc33dbd7f35f69=1593800751'

const GET = async ({ path }) => {
  let url = `${ ENDPOINT }${ path }`
  let res = await fetch(url, {
    headers: {
      cookie: COOKIE
    }
  })
  let data = await res.json()
  return data
}

module.exports = { GET }