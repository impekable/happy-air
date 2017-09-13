import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import '../../styles/main.scss'

const customContentStyle = {
  width: '40%',
  maxWidth: '480px'
}

const OverbookedModal = props => {
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={props.onRequestClose}
      backgroundColor="#d9d9d9"
      hoverColor="##d9d9d9"
      className="overbookedModalCancelButton"
    />,
    <FlatButton
      label="Yes"
      primary
      onTouchTap={props.openSideBar}
      backgroundColor="#003399"
      hoverColor="#06328a"
      className="overbookedModalYesButton"
    />
  ]

  return (
    <Dialog
      title="FLIGHT OVERBOOKED"
      titleClassName="overbookedModalTitle"
      contentClassName="overbookedModalContent"
      actionsContainerClassName="overbookedModalButtonsContainer"
      actions={actions}
      contentStyle={customContentStyle}
      modal={false}
      open={props.open}
      onRequestClose={props.onRequestClose}
    >
      <h4>SEATS NEEDED</h4>
      <div className="seatsNeeded">1</div>
      <p>Send out a flight change bid request to passengers?</p>
    </Dialog>
  )
}

export default OverbookedModal
