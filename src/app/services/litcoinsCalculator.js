import { ONBOARDING, LITCOIN_TYPES as L } from '../constants/litcoins'
import R from 'ramda'
const LitcoinCalculator = () => {
  const getCumulativeBalance = ({
    initLitcoinBalance = false,
    genreIds = [],
    readerIds = [],
    authorIds = [],
  }) => {

    const calculateTotal = (value, litcoinsValue, isBoolean = false) => {
      if (isBoolean) {
        if (value) {
          total += litcoinsValue
        }
      } else {
        if (value) {
          total += value * litcoinsValue
        }
      }
    }

    let total = 0

    const fiveGenreLimit = R.take(5, genreIds)

    calculateTotal(initLitcoinBalance, ONBOARDING[L.CREATED_ACCOUNT_SOCIAL], true)
    calculateTotal(fiveGenreLimit.length, ONBOARDING[L.CHOSE_GENRE])
    calculateTotal(readerIds.length, ONBOARDING[L.CHOSE_AUTHOR])
    calculateTotal(authorIds.length, ONBOARDING[L.CHOSE_READER])

    return total
  }

  const getSelectedBalance = (selected) => {
    return ONBOARDING[selected]
  }

  return {
    getCumulativeBalance,
    getSelectedBalance,
  }
}

export default LitcoinCalculator()
