import axios from 'axios'
import { resetDemoData } from '../reset'
import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAIL,
  ITEM_UPDATE,
  FLIGHT_OVERBOOKED,
  SELECT_WINNER_SUCCESS,
  SEND_VOUCHER_SUCCESS,
  CLOSE_DRAWER,
  OPEN_DRAWER,
  CLOSE_SNACK
} from './types'

// Constant keys in sync database
const FLIGHT_BIDDING_PASSENGERS = 'Happy Air'
const FLIGHT_DATABASE = 'Flight Data'

// Makes a request to token route set up in server.js to recieve auth token
// With this token, we can create a client to access our sync database
export const fetchData = () => dispatch => {
  axios.get('/token')
  .then(response => {
    const { token } = response.data
    const syncClient = new Twilio.Sync.Client(token, { logLevel: 'info' })

    syncClient.map(FLIGHT_BIDDING_PASSENGERS).then(map => {
      map.getItems().then(page => {
        // return data in event with client
        // saving syncClient in redux state for easy recycling
        const data = page.items[0].value
        dispatch({
          type: FETCH_DATA_SUCCESS,
          payload: { data, syncClient }
        })
      })
    })
  })
  .catch(error => {
    dispatch({
      type: FETCH_DATA_FAIL,
      payload: error
    })
  })
}

// Sets full attribute in sync database to true
export const overbookFlight = syncClient => dispatch => {
  syncClient.map(FLIGHT_BIDDING_PASSENGERS).then(map => {
    map.update(FLIGHT_DATABASE, { full: true, selectedBidderID: '' })
    .then(() => {
      dispatch({
        type: FLIGHT_OVERBOOKED,
        payload: true
      })

      // Immediately start listening for incoming bids
      map.on('itemUpdated', item => {
        dispatch({
          type: ITEM_UPDATE,
          payload: item.value
        })
      })
    })
  })
}

export const selectWinningBid = (syncClient, winningUser) => dispatch => {
  dispatch({
    type: SELECT_WINNER_SUCCESS,
    payload: winningUser
  })
}

// Posts to route in server.js to send text message using twilio sms (https://www.twilio.com/sms)
const sendWinningBidderTextMessage = (winningPassenger, dispatch, syncClient) => {
  const phoneNumber = String(winningPassenger.phoneNumber)
  axios.post('/sendsms', { phoneNumber })
    .then(() => {
      dispatch({
        type: SEND_VOUCHER_SUCCESS
      })
    })
}

// Resets database full attribute to false and selects winning bidder
export const sendVoucher = (syncClient, winningUser) => dispatch => {
  syncClient.map(FLIGHT_BIDDING_PASSENGERS).then(map => {
    map.mutate(FLIGHT_DATABASE, remoteData => {
      const remoteSyncData = remoteData
      remoteSyncData.full = false
      remoteSyncData.selectedBidderID = winningUser
      sendWinningBidderTextMessage(winningUser, dispatch, syncClient)
      return remoteSyncData
    })
  })
}

// Clears sync database with default values
export const resetData = syncClient => dispatch => {
  // stringify and reparse to filter data glitch
  const clone = (JSON.parse(JSON.stringify(resetDemoData)))
  syncClient.map(FLIGHT_BIDDING_PASSENGERS).then(map => {
    map.set(FLIGHT_DATABASE, clone)
  })

  dispatch({
    type: CLOSE_DRAWER,
    payload: clone
  })
}

// Use for testing purposes, if mobile app is not available
export const bidPlaced = (syncClient, passenger, bid) => {
  syncClient.map(FLIGHT_BIDDING_PASSENGERS).then(map => {
    map.mutate(FLIGHT_DATABASE, remoteData => {
      const { overbooked } = remoteData.users[2]
      overbooked.bid_price = bid
      return remoteData
    })
  })
}

export const closeSnack = () => ({
  type: CLOSE_SNACK
})

export const openDrawer = () => ({
  type: OPEN_DRAWER
})
