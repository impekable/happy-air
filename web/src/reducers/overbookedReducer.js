import {
  FETCH_DATA_SUCCESS,
  ITEM_UPDATE,
  FLIGHT_OVERBOOKED,
  SEND_VOUCHER_SUCCESS,
  CLOSE_DRAWER
} from '../actions/types'

const INITIAL_STATE = {
  data: null,
  syncClient: {},
  flightOverbooked: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        syncClient: action.payload.syncClient
      }
    case ITEM_UPDATE:
      return { ...state, data: action.payload }
    case FLIGHT_OVERBOOKED:
      return { ...state, flightOverbooked: true }
    case SEND_VOUCHER_SUCCESS:
      return { ...state, flightOverbooked: false, data: action.payload }
    case CLOSE_DRAWER:
      return { ...state, flightOverbooked: false, data: action.payload }
    default:
      return state
  }
}
