const fetch = require('node-fetch')

const ENDPOINT = 'https://www.speedrun.com/api/v1'

const GET = async ({ path }) => {
  let url = `${ ENDPOINT }${ path }`
  let res = await fetch(url)
  let data = await res.json()
  return data
}

module.exports = { GET }