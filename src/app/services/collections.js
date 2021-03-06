import R from 'ramda'

// Utilities for working w/ collections
const Collections = () => {
  const pairs = (arr) => {
    const reducer = (result, value, index) => {
      if (index % 2 === 0) { result.push(arr.slice(index, index + 2)) }

      return result
    }

    return R.addIndex(R.reduce)(reducer, [], arr)
  }

  const assocList = (obj) => {
    return R.zip(R.keys(obj), R.values(obj))
  }

  const fromAssocList = (assocList) => {
    const firsts = R.map(R.nth(0))
    const seconds = R.map(R.nth(1))
    return R.zipObj(firsts(assocList), seconds(assocList))
  }

  const mergesAll = (argA, argB) => {
    if (Array.isArray(argA) && Array.isArray(argB)) { return R.concat(argA, argB) }
    return R.merge(argA, argB)
  }

  return {
    assocList,
    fromAssocList,
    pairs,
    mergesAll,
  }
}

export default Collections()
