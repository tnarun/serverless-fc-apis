const fetch = require('node-fetch')

const ENDPOINT = 'https://shimo.im/api/newforms/forms'

const GET = async ({ path }) => {
  let url = `${ ENDPOINT }${ path }`
  let res = await fetch(url)
  let data = await res.json()
  return data
}

module.exports = { GET }