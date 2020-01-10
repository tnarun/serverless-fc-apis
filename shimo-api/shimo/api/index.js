const Router = require('url-router')
const util = require('util')
const { getJsonBody, respJSON } = require('ben7th-fc-utils')

const $forms = require('./lib/forms')
const formClean = require('./lib/formClean')

const router = new Router([
  // GET
  ['/formResult/:formGuid', async ({ req, resp, route }) => {
    // let { queries } = req
    let { params } = route
    let { formGuid } = params

    let meta = await $forms.getMeta({ formGuid })
    let result = await $forms.getResult({ formGuid })
    let cleaned = await formClean({ meta, result })

    return { formGuid, meta, result, cleaned }
  }],
])

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
      .catch(e => respJSON(resp, { error: util.inspect(e).split(`\n`) }))
    return
  }

  respJSON(resp, { error: 'no such API PATH', path: req.path })
}