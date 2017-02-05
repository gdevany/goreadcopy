import R from 'ramda'

const Deserialization = () => {
  const data = R.prop('data')
  const results = R.prop('results')

  const fromPaginated = R.compose(results, data)

  return {
    fromPaginated,
  }
}

export default Deserialization()
