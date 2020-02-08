import React, { Component } from 'react'
import './Die.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix
} from '@fortawesome/free-solid-svg-icons'

class Die extends Component {
  constructor(props) {
    super(props)

    this.callToggleState = this.callToggleState.bind(this)
  }

  callToggleState() {
    this.props.toggleState(this.props.idx)
  }

  render() {
    const diceNames = [
      faDiceOne,
      faDiceTwo,
      faDiceThree,
      faDiceFour,
      faDiceFive,
      faDiceSix
    ]
    const { isLocked, shouldAnimate, hasGameStarted, val } = this.props
    const dieSide = diceNames[val - 1]

    const shouldAnimateDie = hasGameStarted && shouldAnimate && !isLocked
    const shouldDisableDie = hasGameStarted && isLocked

    let classes = 'Die'
    if (shouldAnimateDie) classes += ' Die-animate '
    if (shouldDisableDie) classes += ' Die-disabled '

    return (
      <FontAwesomeIcon
        icon={dieSide}
        className={classes}
        onClick={hasGameStarted ? this.callToggleState : undefined}
      />
    )
  }
}

export default Die
