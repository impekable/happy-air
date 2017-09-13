import React from 'react'
import { Card, CardActions, CardHeader, CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'

import '../../styles/bidCard.scss'


export const BidCard = props => {
  const {
    cardHeader,
    titleStyle,
    cardActions,
    actionBidStyle,
    actionTitleStyle,
    subtitleStyle,
    buttonStyle,
    buttonLabelStyle,
    buttonLabelStyleSelected
  } = styles

  const renderButton = buttonProps => {
    const { id, phoneNumber } = buttonProps
    const selectedBidderData = {
      id,
      phoneNumber
    }

    let selectedBidderID = ''

    if (buttonProps.selectedBidder) {
      selectedBidderID = buttonProps.selectedBidder.id
    }

    if (selectedBidderID === buttonProps.id) {
      return (
        <FlatButton
          hoverColor="#003399"
          icon={
            <FontIcon
              className="material-icons"
              color="#fff"
            >
              check
            </FontIcon>
          }
          backgroundColor="#003399"
          label="SELECTED"
          onTouchTap={() => buttonProps.selectWinningBid(selectedBidderData)} style={buttonStyle}
          labelStyle={buttonLabelStyleSelected}
        />
      )
    }
    return (
      <FlatButton
        hoverColor="rgba(0, 51, 153, 0.34)"
        label="SELECT"
        onTouchTap={() =>
          props.selectWinningBid(selectedBidderData)}
        style={buttonStyle}
        labelStyle={buttonLabelStyle}
      />
    )
  }

  return (
    <Card style={{ margin: 15 }}>
      <CardHeader
        style={cardHeader}
        title={props.name}
        titleStyle={titleStyle}
        avatar={<Avatar src={props.imageURL} size={60} />}
      />
      <Divider />

      <CardActions style={cardActions}>
        <CardTitle
          title="BIDDING PRICE"
          subtitle={`$${props.bid}`}
          style={actionBidStyle}
          titleStyle={actionTitleStyle}
          subtitleStyle={subtitleStyle}
          subtitleColor="#e12127"
        />
        {renderButton(props)}
      </CardActions>
    </Card>
  )
}

const styles = {
  titleStyle: {
    fontSize: 18
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionBidStyle: {
    paddingTop: 0,
    paddingBottom: 0
  },
  actionTitleStyle: {
    color: '#4a4a4a',
    fontSize: 12
  },
  subtitleStyle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonStyle: {
    height: 'auto',
    borderWidth: 2,
    borderColor: '#003399',
    borderStyle: 'solid',
    borderRadius: 4,
    minWidth: 180
  },
  buttonLabelStyle: {
    fontSize: 20,
    color: '#003399'
  },
  buttonLabelStyleSelected: {
    fontSize: 20,
    color: '#fff'
  }
}
