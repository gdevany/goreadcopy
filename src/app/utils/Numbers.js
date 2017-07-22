const wrapper = {
  /*
    Converts a received number (or numeric string) onto it's currency presentation by localizing.
  */
  parseFloatToUSD: (value) => {
    if (typeof value === 'string') { value = Number(value) }
    if (value !== null && !isNaN(value)) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
    return value
  },
  /*
    Converts a received number (or numeric string) onto it's basic localized presentation.
  */
  parseIntToLocale: (value) => {
    if (typeof value === 'string') { value = Number(value) }
    if (value !== null && !isNaN(value)) {
      return value.toLocaleString()
    }
    return value
  }
}

export default wrapper
