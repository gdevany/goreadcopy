import R from 'ramda'

const Collections = () => {
  const pairs = (arr) => {
    const reducer = (result, value, index) => {
      if (index % 2 === 0) { result.push(arr.slice(index, index + 2)) }

      return result
    }

    return R.addIndex(R.reduce)(reducer, [], arr)
  }

  return {
    pairs,
  }
}

export default Collections()
