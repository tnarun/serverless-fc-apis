const fetch = require('node-fetch')

const getOnePage = async ({ pay_success_sn }) => {
  let url = 'https://afdian.net/api/my/sponsored-bill?type=old'
  if (pay_success_sn) {
    url = `${url}&pay_success_sn=${pay_success_sn}`
  }

  let res = await fetch(url, {
    headers: {
      cookie: '_ga=GA1.2.1868436802.1576462287; _gid=GA1.2.784654211.1581050396; auth_token=6939b224c4ae9e099dd14628a9c65f1d; _gat_gtag_UA_116694640_1=1'
    }
  })
  let data = await res.json()
  return data.data
}

const getList = async () => {
  let pay_success_sn = null
  let resultList = []
  while (true) {
    let data = await getOnePage({ pay_success_sn })
    // console.log(data)
    let { has_more, list } = data
    resultList = [].concat(resultList).concat(list)
    if (has_more) {
      pay_success_sn = list[list.length - 1].pay_success_sn
    } else {
      break
    }
  }
  return resultList
}

module.exports = {
  getList
}