import React, { Component } from 'react'
import Die from './Die'
import './Dice.css'

class Dice extends Component {
  render() {
    /* Destructuring prop keys from this.props */

    const { toggleState, rollsLeft, totalRolls, shouldAnimate } = this.props

    return (
      <div className='Dice'>
        {this.props.diceArr.map((die, index) => (
          <Die
            key={index}
            val={die}
            isLocked={this.props.diceLocked[index]}
            toggleState={toggleState}
            idx={index}
            hasGameStarted={rollsLeft < totalRolls}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>
    )
  }
}

export default Dice
