import { combineReducers } from 'redux'
import OverbookedReducer from './overbookedReducer'
import selectedBidderReducer from './selectedBidderReducer'

const rootReducer = combineReducers({
  overbooked: OverbookedReducer,
  selectedBidder: selectedBidderReducer
})

export default rootReducer
