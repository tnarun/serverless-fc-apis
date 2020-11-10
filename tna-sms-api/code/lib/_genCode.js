const _genCode = () => {
  let arr = '0123456789'
  let code = ''
  for (let i = 0; i < 4; i ++) {
    let s = arr[~~(Math.random() * arr.length)]
    code = `${code}${s}`
  }
  return code
}

module.exports = _genCode