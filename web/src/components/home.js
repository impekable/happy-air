import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import injectTapEventPlugin from 'react-tap-event-plugin'

import {
  fetchData,
  bidPlaced,
  subscribe,
  resetData,
  overbookFlight,
  closeSnack,
  openDrawer
} from '../actions'

import Plane from './plane'
import OverbookedModal from './overbooked_modal'
import SideDrawer from './drawer'
import '../../styles/main.scss'

const HAPPY_AIR_LOGO = require('../../assets/happy-air-logo@3x.png')
const PROFILE_PHOTO = require('../../assets/profile-photo-copy.png')

// Icons
const homeIcon = require('../../assets/ic-home.svg')
const airplaneIcon = require('../../assets/airplane.svg')
const overbookedIcon = require('../../assets/overbooked.svg')
const resetIcon = require('../../assets/reset.svg')

injectTapEventPlugin()


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      drawerOpen: false,
      SnackbarOpen: false
    }
  }

  componentWillMount() {
    this.props.fetchData()
  }

  buttonResetClick() {
    const { syncClient } = this.props.overbooked
    this.props.resetData(syncClient)
  }

  overbookClicked() {
    this.setState({ modalOpen: true })
  }

  bidClicked() {
    // Used for testing bids if mobile app is not available
    const passengerNumber = Math.floor(Math.random() * 6) + 1
    const bidAmout = Math.floor(Math.random() * 900) + 100
    const { syncClient } = this.props.overbooked
    this.props.bidPlaced(syncClient, passengerNumber, bidAmout)
  }

  openSidebar() {
    const { syncClient } = this.props.overbooked
    this.props.openDrawer()
    this.setState({ modalOpen: false })
    this.props.overbookFlight(syncClient)
  }

  handleClose() {
    this.setState({ modalOpen: false })
  }

  handleRequestClose() {
    this.props.closeSnack()
  }

  renderSnackBar() {
    if (this.props.selectedBidder.selectedBidderInfo) {
      this.setState({ drawerOpen: false })
      this.setState({ SnackbarOpen: true })
    }
  }

  // Used for testing bids if mobile app is not available
  renderPlaceBidDevButton() {
    if (process.env.NODE_ENV === 'development') {
      return (
        <RaisedButton
          label="Place Bid"
          onTouchTap={this.bidClicked.bind(this)}
        />
      )
    }
    return null
  }

  render() {
    const {
      navInfoWrapper,
      navImageStyle,
      navTextStyle,
      navSidebarImageGroupStyle,
      navSidebarImageStyle,
      activeNavSidebarImageStyle,
      actionItemsStyle
    } = styles

    const {
      selectedBidder,
      overbooked
    } = this.props

    return (
      <div className="airlineBody">
        <div className="navbar">
          {this.renderPlaceBidDevButton()}
          <img
            src={HAPPY_AIR_LOGO}
            alt="Happy Air Logo"
            style={{ height: 30 }}
          />
          <div style={navInfoWrapper}>
            <img
              src={PROFILE_PHOTO}
              alt="Profile"
              style={navImageStyle}
            />
            <p style={navTextStyle}>Abbie Harvey</p>
          </div>
        </div>

        <div className="navSidebar">
          <div style={navSidebarImageGroupStyle}>
            <img src={homeIcon} alt="Home Icon" style={navSidebarImageStyle} />
            <img
              src={airplaneIcon}
              alt="Airplane Icon"
              style={{ ...navSidebarImageStyle, ...activeNavSidebarImageStyle }}
            />
          </div>
          <div style={navSidebarImageGroupStyle}>
            <FlatButton
              icon={<img src={overbookedIcon} alt="Overbooked Icon" />}
              style={actionItemsStyle}
              onTouchTap={this.overbookClicked.bind(this)}
            />
            <FlatButton
              icon={<img src={resetIcon} alt="Home Icon" />}
              style={actionItemsStyle}
              onTouchTap={this.buttonResetClick.bind(this)}
            />
          </div>
        </div>

        <Plane selectedBidder={selectedBidder} overbooked={overbooked} />

        <SideDrawer open={selectedBidder.drawerOpen} />

        <OverbookedModal
          open={this.state.modalOpen}
          onRequestClose={this.handleClose.bind(this)}
          openSideBar={this.openSidebar.bind(this)}
        />
      </div>
    )
  }
}

const styles = {
  navSidebarImageGroupStyle: {
    display: 'flex',
    flexDirection: 'column'
  },
  navSidebarImageStyle: {
    paddingTop: 14,
    paddingBottom: 14
  },
  activeNavSidebarImageStyle: {
    backgroundColor: '#bbbbbb',
    borderLeftColor: '#003399',
    borderLeftStyle: 'solid',
    borderLeftWidth: 3
  },
  actionItemsStyle: {
    height: 'auto',
    minWidth: 'auto',
    paddingTop: 8,
    paddingBottom: 8
  },
  navImageStyle: {
    backgroundColor: '#fff',
    width: 52,
    height: 52,
    borderRadius: 30
  },
  navTextStyle: {
    color: '#fff',
    marginLeft: 10
  },
  navInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}

const mapStatetoProps = ({ overbooked, selectedBidder }) =>
({ overbooked, selectedBidder })

export default connect(mapStatetoProps,
  { fetchData,
    bidPlaced,
    subscribe,
    resetData,
    overbookFlight,
    closeSnack,
    openDrawer })(Home)
