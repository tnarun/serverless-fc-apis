module.exports = ({ meta, result }) => {
  let { header, map } = parseHeader({ meta })
  let body = parseBody({ result })
  return { header, body, map }
}

const parseHeader = ({ meta }) => {
  let { publishedContent } = meta
  let publishedContentData = JSON.parse(publishedContent).questions
  let subjectMap = {}
  publishedContentData.forEach(x => {
    subjectMap[x.guid] = x.subject
  })

  return { header: publishedContentData, map: subjectMap }
}

const parseBody = ({ result }) => {
  let { responses } = result

  let parsed = responses.map(x => {
    let { id, createdAt } = x
    let data = JSON.parse(x.content)
    return { id, createdAt, data }
  })

  let parsedKVs = parsed.map(x => {
    let re = {}
    x.data.forEach(y => {
      re[y.guid] = y
    })
    return re
  })

  return parsed
}