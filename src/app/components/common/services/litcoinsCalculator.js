import { ONBOARDING, LITCOIN_TYPES as L } from '../../../constants/litcoins'
import R from 'ramda'

const LitcoinCalculator = () => {
  const getCumulativeBalance = ({
    email = false,
    username = false,
    password = false,
    genreIds = [],
    readerIds = [],
    authorIds = [],
    submitSuccessful = false,
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

    calculateTotal(email, ONBOARDING[L.COMPLETE_SIGNUP_MODAL], true)
    calculateTotal(username, ONBOARDING[L.ENTERS_USERNAME], true)
    calculateTotal(password, ONBOARDING[L.ENTERS_PASSWORD], true)
    calculateTotal(submitSuccessful, ONBOARDING[L.CREATED_ACCOUNT], true)
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
