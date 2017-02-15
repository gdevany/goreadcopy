import QS from 'query-string'
window.QS = QS
import R from 'ramda'

const QueryParams = () => {
  const asParams = (paramsObj) => {
    if (R.isEmpty(paramsObj)) {
      return ''
    }
    // NOTE: API needs array params of the format ?arg=X,Y,Z which isn't
    // commonly supported. Need to handle them separately from other
    // types of params
    const arraysAndOthers = R.partition(Array.isArray, paramsObj)
    const [arrayArgs, otherArgs] = arraysAndOthers
    const arraysAsStrings = R.map(R.compose(R.join(','), R.values), arrayArgs)
    const allArgs = R.merge(otherArgs, arraysAsStrings)

    return `?${QS.stringify(allArgs)}`
  }

  return {
    asParams,
  }
}

export default QueryParams()
