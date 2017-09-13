import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton';
import { selectWinningBid, sendVoucher } from '../actions'
import { BidCard } from './bid'
import '../../styles/main.scss'

const doneIcon = require('../../assets/ic-done.svg')

class SideDrawer extends Component {
  static propTypes: {
    selectWinningBid: PropTypes.func.isRequired
  }

  renderBidders() {
    const { data, syncClient } = this.props.overbooked
    const { selectedBidder } = this.props.selectedBidder

    // Initial load, syncClient is not ready
    if (!data) {
      return <div>Loading...</div>
    }

    // Snack shown when flight is no longer overbooked
    if (this.props.selectedBidder.snack) {
      return (
        <div className="voucherSent">
          <img src={doneIcon} alt="Done icon" />
          <p style={{ fontSize: 20, fontWeight: 600, marginTop: 10 }}>Voucher sent</p>
          <p style={{ fontSize: 20, color: '#656565', marginTop: 10 }}>
            This flight is no longer overbooked
          </p>
        </div>
      )
    }

    // renders all biggers in the drawer as bids come in
    const bidders = data.users.map(bidder => {
      const bidPrice = bidder.overbooked.bid_price

      if (parseInt(bidPrice, 10)) {
        return (
          <BidCard
            selectedBidder={selectedBidder || null}
            key={bidder.UID}
            id={bidder.UID}
            name={bidder.name}
            imageURL={bidder.imageURL}
            bid={bidPrice}
            phoneNumber={bidder.phoneNumber}
            selectWinningBid={
              winningBid => this.props.selectWinningBid(syncClient, winningBid)
            }
          />
        )
      }
    })

    let empty = true
    bidders.forEach(item => {
      if (typeof (item) === 'object') {
        empty = false
      }
    })

    // Checks if passengers have places a big. If so, renders the bids
    // if not, renders and loading screen
    if (empty) {
      return (
        <div style={{ marginTop: 20, marginLeft: 20 }}>
          Waiting for bids from passengers…
        </div>
      )
    }
    return bidders
  }

  renderVoucherButton() {
    const {
      wrapper,
      buttonStyle
    } = styles

    const { selectedBidder } = this.props.selectedBidder
    const { syncClient } = this.props.overbooked

    // only show voucher button when someone has been selected
    if (selectedBidder) {
      return (
        <div style={wrapper}>
          <FlatButton
            backgroundColor="#edb72b"
            hoverColor="#dbaa29"
            label="SEND VOUCHERS"
            onTouchTap={() =>
              this.props.sendVoucher(syncClient, selectedBidder)} style={buttonStyle}
          /></div>
      )
    }
    return null
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Drawer
          open={this.props.open}
          openSecondary width="30%"
          containerClassName="drawerContainer"
        >
          { this.renderBidders() }
          { this.renderVoucherButton()}
        </Drawer>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#b1aca0',
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    display: 'flex',
    zIndex: 44444
  },
  buttonStyle: {
    flex: 1,
    height: 45
  }
}

const mapStateToProps = ({ overbooked, selectedBidder }) =>
({ overbooked, selectedBidder })

export default connect(mapStateToProps, { selectWinningBid, sendVoucher })(SideDrawer)
