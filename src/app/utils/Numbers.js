const wrapper = {
  /*
    Converts a received number onto it's currency presentation by localizing.
    By default, it uses 2 decimals, but can be sent over by a param instead.
  */
  parseFloatToUSD: (value, decimals = 2) => {
    if (typeof value === 'string') { value = Number(value) }
    if (value !== null && !isNaN(value)) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
    return value
  },
  parseIntToLocale: (value) => {
    if (typeof value === 'string') { value = Number(value) }
    if (value !== null && !isNaN(value)) {
      return value.toLocaleString()
    }
    return value
  }
}

export default wrapper
