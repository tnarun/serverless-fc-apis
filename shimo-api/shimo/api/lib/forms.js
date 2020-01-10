// 获取结果数据
// https://shimo.im/api/newforms/forms/tGlSvtsqiJgno3Yn/responses?offset=0&limit=1000000

// 获取元数据
// https://shimo.im/api/newforms/forms/tGlSvtsqiJgno3Yn/publications

const { GET } = require('./utils')

const forms = {
  async getMeta ({ formGuid }) {
    let path = `/${formGuid}/publications`
    return await GET({ path })
  },

  async getResult ({ formGuid }) {
    let path = `/${formGuid}/responses?offset=0&limit=1000000`
    return await GET({ path })
  }
}

module.exports = forms