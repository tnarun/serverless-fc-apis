const { GET } = require('./utils')

const runs = {
  async getOne ({ id }) {
    let path = `/runs/${id}?embed=game.variables,category,level,players,region,platform`
    let res = await GET({ path })
    return res.data
  }
}

module.exports = runs