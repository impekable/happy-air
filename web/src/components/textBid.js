import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'

import Divider from 'material-ui/Divider'

const planeIcon = require('../../assets/plane-small.svg')


export const FlightInfo = props => {
  const {
    cardWrapperContainerStyle,
    cardInfoContainerStyle,
    flightInfoToolbar,
    flightInfoToolbarHeader,
    flightInfoToolbarHeaderText,
    flightInfoToolbarBody,
    flightInfoToolbarLocations,
    flightDetailsStyle,
    seatsNeededContainerStyle,
    seatsNeededStyle,
    flightInfoToolbarDetail,
    flightDetailsKeyStyle,
    flightDetailsValueStyle
  } = styles

  return (
    <div style={cardWrapperContainerStyle}>
      <Card style={cardInfoContainerStyle}>
        <Toolbar style={flightInfoToolbarHeader}>
          <CardHeader
            title="Las Vegas"
            style={flightInfoToolbarHeaderText}
            textStyle={{ fontWeight: 700, fontSize: 17, paddingRight: 45 }}
          />
          <CardHeader
            title="May 24, 2017"
            style={flightInfoToolbarHeaderText}
            textStyle={{ fontSize: 17, paddingRight: 45 }}
          />
        </Toolbar>
        <Divider />
        <CardText>
          <Toolbar style={flightInfoToolbarBody}>
            <div style={flightInfoToolbarLocations}>
              <h1 style={{ fontSize: 43, fontWeight: 300 }}>SFO</h1>
              <img
                src={planeIcon}
                alt="small airplane"
                style={{ paddingLeft: 10, paddingRight: 10 }}
              />
              <h1 style={{ fontSize: 43, fontWeight: 300 }}>LAS</h1>
            </div>
            <p style={{ color: '#d0011b', marginTop: 15, marginLeft: 10 }}>{props.overbooked.flightOverbooked ? 'OVERBOOKED' : ''}</p>
          </Toolbar>
        </CardText>
        <CardText style={flightInfoToolbarDetail}>
          <Toolbar style={flightInfoToolbar}>
            <ToolbarGroup style={flightDetailsStyle}>
              <p style={flightDetailsKeyStyle}>DEPART</p>
              <p style={flightDetailsValueStyle}>3:30 PM</p>
            </ToolbarGroup>
            <ToolbarGroup style={flightDetailsStyle}>
              <p style={flightDetailsKeyStyle}>FLIGHT</p>
              <p style={flightDetailsValueStyle}>47</p>
            </ToolbarGroup>
            <ToolbarGroup style={flightDetailsStyle}>
              <p style={flightDetailsKeyStyle}>GATE</p>
              <p style={flightDetailsValueStyle}>B6</p>
            </ToolbarGroup>
          </Toolbar>
        </CardText>
      </Card>
      {
        props.overbooked.flightOverbooked &&
        <Card containerStyle={seatsNeededContainerStyle}>
          <CardHeader title="Seats Needed" />
          <Divider />
          <CardText>
            <h2 style={seatsNeededStyle}>1</h2>
          </CardText>
        </Card>
      }
    </div>

  )
}

const styles = {
  cardWrapperContainerStyle: {
    position: 'absolute',
    left: 10,
    bottom: 10
  },
  cardContainerStyle: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 10,
    left: 10
  },
  cardInfoContainerStyle: {
    backgroundColor: '#fff',
    boxShadow: 'none',
    borderColor: '#b1aca0',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4
  },
  bidNumberStyle: {
    color: '#003399'
  },
  flightInfoToolbar: {
    backgroundColor: 'transparent'
  },
  flightInfoToolbarHeader: {
    backgroundColor: 'transparent',
    height: 42
  },
  flightInfoToolbarHeaderText: { padding: 11 },
  flightInfoToolbarBody: {
    height: 'auto',
    backgroundColor: 'transparent'
  },
  flightInfoToolbarLocations: {
    display: 'flex',
    flexDirection: 'row'
  },
  flightDetailsStyle: {
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  flightInfoToolbarDetail: {
    paddingTop: 0,
    paddingLeft: 16,
    paddingBottom: 0,
    paddingRight: 16
  },
  flightDetailsKeyStyle: {
    fontSize: 16,
    fontWeight: 300,
    color: '#b1aca0'
  },
  flightDetailsValueStyle: {
    fontSize: 20,
    fontWeight: 300,
    color: '#231f20'
  },
  seatsNeededContainerStyle: {
    marginTop: 15
  },
  seatsNeededStyle: {
    backgroundColor: '#d0011b',
    color: '#fff',
    display: 'inline-block',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15
  }
}
