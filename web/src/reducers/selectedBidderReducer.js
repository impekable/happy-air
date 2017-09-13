import {
  SELECT_WINNER_SUCCESS,
  SEND_VOUCHER_SUCCESS,
  CLOSE_DRAWER,
  OPEN_DRAWER,
  CLOSE_SNACK
} from '../actions/types'

const INITIAL_STATE = {
  selectedBidder: null,
  snack: false,
  drawerOpen: false
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_WINNER_SUCCESS:
      return { ...state, selectedBidder: action.payload }
    case SEND_VOUCHER_SUCCESS:
      return { ...state, selectedBidder: null, snack: true }
    case CLOSE_SNACK:
      return { ...state, snack: false }
    case OPEN_DRAWER:
      return { ...state, drawerOpen: true }
    case CLOSE_DRAWER:
      return { ...state, drawerOpen: false, snack: false }
    default:
      return state
  }
}
