const { GET } = require('./utils')

const leaderboards = {
  async getCategory ({ game, category, currentRunVars }) {
    let varsParams = currentRunVars.map(crv => {
      return `var-${crv.key}=${crv.value}`
    }).join('&')
    let path = `/leaderboards/${game}/category/${category}?embed=game,category,level,players,region,platforms,variables&${varsParams}`
    let res = await GET({ path })
    return res.data
  }
}

module.exports = leaderboards