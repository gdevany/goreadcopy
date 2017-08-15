import { CURRENT_READER as A } from '../const/actionTypes'
import LitcoinCalculator from '../../services/litcoinsCalculator'
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

export default { updateLitcoinBalance }
