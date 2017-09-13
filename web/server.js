// @flow
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const AccessToken = require('twilio').jwt.AccessToken
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const SyncGrant = AccessToken.SyncGrant

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Returns token for use on twilio services
app.get('/token', (req, res) => {
  const identity = 'Meek Dekowski'

  // https://www.twilio.com/docs/api/sync/quickstart-js
  const syncGrant = new SyncGrant({
    serviceSid: process.env.TWILIO_SYNC_SERVICE_SID
  })

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  )

  token.addGrant(syncGrant)
  token.identity = identity

  res.send({
    identity,
    token: token.toJwt()
  })
})

// Uses Twilio sms to send text to passenger with the winning bid
app.post('/sendsms', (req, response) => {
  // Your twilio sms number (https://www.twilio.com/sms)
  const TWILIO_SMS_NUMBER = '+1'

  client.messages.create({
    body: 'Congratulations! Your bid has been selected. Please visit the Happy Air service counter to claim your credit. We thank you for your flexibility.',
    to: req.body.phoneNumber,
    from: TWILIO_SMS_NUMBER
  })
  response.send({ status: 'Sent sms' })
})

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config.js')
  app.use(webpackMiddleware(webpack(webpackConfig)))
} else {
  app.use(express.static('build'))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
}

app.set('port', process.env.PORT || 8080)

const server = app.listen(app.get('port'), () => {
  const port = server.address().port
  console.log(`Listening on ${port}`)
})
