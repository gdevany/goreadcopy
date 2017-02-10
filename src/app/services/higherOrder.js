import R from 'ramda'

// For utilities which operate on higher order fns
// (think map/filter/reduce, etc)
const HigherOrder = () => {
  // Usage:
  // useThreeIn = applyVal(3)
  // useThreeIn([(x) => x * 2, (y) => y + 4]) => [6, 7]
  const applyVal = R.compose(R.flip(R.ap), R.of)

  return {
    applyVal,
  }
}

export default HigherOrder()
