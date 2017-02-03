import P from 'bluebird'

const Promises = () => {
  const of = P.resolve

  return {
    ...P,
    of,
  }
}

export default Promises()
