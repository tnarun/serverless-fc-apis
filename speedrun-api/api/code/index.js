const Router = require('url-router')
const util = require('util')
const { getJsonBody, respJSON } = require('ben7th-fc-utils')

const $runs = require('./lib/runs')
const $leaderboards = require('./lib/leaderboards')

const router = new Router([
  // GET
  // /runs/y21w397z
  ['/runs/:id', async ({ req, resp, route }) => {
    // let { queries } = req
    let { params } = route
    let { id } = params

    // 获取成绩数据
    let runData = await $runs.getOne({ id })
    if (!runData) {
      return { error: `ID ${id} 没有成绩数据` }
    }

    let gameId = runData.game.data.id
    let gameVariables = runData.game.data.variables.data
    let runValues = runData.values
    
    // 榜单划分依据：子分类 subcategory
    let subCategories = gameVariables.filter(v => {
      let c1 = v['is-subcategory'] === true
      let c2 = !!runValues[v.id]
      return c1 && c2
    }).map(c => {
      return { id: c.id, name: c.name, values: c.values }
    })

    // 当前 run 的子分类变量
    let currentRunVars = subCategories.map(c => {
      let key = c.id
      let value = runData.values[key]
      let name = c.name
      let current = c.values.values[value]
      let currentLabel = current.label
      let allLabels = Object.values(c.values.values).map(x => x.label)
      return { key, value, name, current, currentLabel, allLabels }
    })

    // 获取根据变量过滤的排行榜数
    let category = runData.category.data.id
    let leaderboardData = await $leaderboards.getCategory({ 
      game: gameId, 
      category, 
      currentRunVars 
    })

    return { runData, subCategories, currentRunVars, leaderboardData }
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