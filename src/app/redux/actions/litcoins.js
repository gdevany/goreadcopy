import { CURRENT_READER as A } from '../const/actionTypes'
import LitcoinCalculator from '../../services/litcoinsCalculator'
import Litcoins from '../../services/api/currentReader/litcoins'
import { ONBOARDING as O } from '../../constants/litcoins'
import { updateReaderData } from './readerData'
const { getCumulativeBalance, getSelectedBalance } = LitcoinCalculator

export function updateLitcoinBalance(litcoinAction) {
  return (dispatch, getState) => {
    const total = getCumulativeBalance(getState().readerData)
    const selected = litcoinAction ? getSelectedBalance(litcoinAction) : 0

    if (litcoinAction) {
      dispatch({
        type: A.UPDATE_SELECTED,
        payload: { selected },
      })
    }

    dispatch({
      type: A.UPDATE_LITCOIN_BALANCE,
      payload: { total }
    })
  }
}

export function getLitcoinBalance() {
  return (dispatch) => {
    const request = Litcoins.getLitcoinBalance()
    request
      .then(res => dispatch(updateReaderData(
        { initLitcoinBalance: O.CREATED_ACCOUNT_SOCIAL === res.data.getLitcoinBalance })
      ))
      .catch(err => console.error(`Error in getLitcoinBalance ${err}`))
    return request
  }
}

export default { updateLitcoinBalance, getLitcoinBalance }
