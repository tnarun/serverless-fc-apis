const Router = require('url-router')
const util = require('util')
const { respJSON } = require('ben7th-fc-utils')

require('./env')

const modv1 = require('./mods/v1')
const modv2 = require('./mods/v2')

const opts = []
  .concat(modv1)
  .concat(modv2)

const router = new Router(opts)

module.exports.handler = (req, resp, context) => {
  // let params = {
  //   path: req.path,
  //   queries: req.queries,
  //   headers: req.headers,
  //   method : req.method,
  //   requestURI : req.url,
  //   clientIP : req.clientIP,
  // }

  let route = router.find(req.path)

  if (route) {
    route.handler({ req, resp, route })
      .then(data => respJSON(resp, { data }))
      .catch(e => {
         resp.setStatusCode(500)
         respJSON(resp, { error: util.inspect(e).split(`\n`) })
       })
    return
  }

  resp.setStatusCode(404)
  respJSON(resp, { error: 'no such API PATH', path: req.path })
}