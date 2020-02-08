import React, { Component } from 'react'
import Dice from './Dice'
import { genRandNum } from './genRandNum1to6'
import Scoreboard from './Scoreboard'
import './Game.css'

const NUM_DICE = 5 // Number of dice components
const ROLLS_LEFT = 3 // Number of chances a user gets

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      diceArr: new Array(5).fill(6),
      diceLocked: new Array(5).fill(false),
      rollsLeft: ROLLS_LEFT,
      shouldAnimate: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfAKind: undefined,
        fourOfAKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined
      }
    }

    this.shuffleDice = this.shuffleDice.bind(this)
    this.toggleLockedState = this.toggleLockedState.bind(this)
    this.animateDice = this.animateDice.bind(this)
    this.updateScore = this.updateScore.bind(this)
    this.resetGame = this.resetGame.bind(this)
  }

  shuffleDice() {
    const diceNums = []
    for (let i = 0; i < NUM_DICE; i++) {
      let randNum = genRandNum() // Calling outer function to fetch Random Value

      /* Only alter dice that are not locked. Else load Previous Values */

      if (!this.state.diceLocked[i]) diceNums.push(randNum)
      else diceNums.push(this.state.diceArr[i])
    }

    this.setState((prevState) => {
      return {
        rollsLeft:
          prevState.rollsLeft > 0
            ? prevState.rollsLeft - 1
            : prevState.rollsLeft
      }
    })

    /* After 1 second, Reset animation trigger(shouldAnimate) and load new Dice Values */

    setTimeout(() => {
      this.setState({ shouldAnimate: false, diceArr: diceNums })
    }, 1000)

    this.animateDice()
  }

  animateDice() {
    this.setState({
      shouldAnimate: true
    })
  }

  toggleLockedState(index) {
    this.setState((prevState) => {
      return {
        diceLocked: [
          ...prevState.diceLocked.slice(0, index),
          !prevState.diceLocked[index],
          ...prevState.diceLocked.slice(index + 1)
        ]
      }
    })
  }

  updateScore(score, className) {
    this.setState((prevState) => {
      const scores = { ...prevState.scores }
      scores[className] = score
      return {
        scores
      }
    })
  }

  resetGame() {
    this.setState({
      diceLocked: new Array(5).fill(false),
      rollsLeft: ROLLS_LEFT,
      shouldAnimate: false
    })

    document.querySelector('button').disabled = false
  }

  render() {
    const rollsLeft = this.state.rollsLeft > 0
    const button = document.querySelector('.Game-btn')
    const shouldAnimate = this.state.shouldAnimate

    /* Disable button when user is out of rolls */

    if (!rollsLeft) {
      button.setAttribute('disabled', true)
    }

    /* Prevent button clicks during animation 
    1) Check if button has been rendered to the screen!! */

    if (button) {
      if (shouldAnimate) button.style.pointerEvents = 'none'
      else setTimeout(() => (button.style.pointerEvents = 'unset'), 500)
    }

    /* Alter button's textContent */

    let btnText = this.state.rollsLeft
    btnText += this.state.rollsLeft !== 1 ? ` Rolls Left` : ` Roll Left`

    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1>Yahtzee!</h1>
          <Dice
            diceArr={this.state.diceArr}
            diceLocked={this.state.diceLocked}
            toggleState={this.toggleLockedState}
            rollsLeft={this.state.rollsLeft}
            totalRolls={ROLLS_LEFT}
            shouldAnimate={this.state.shouldAnimate}
          />
          <button className='Game-btn' onClick={this.shuffleDice}>
            {btnText}
          </button>
        </header>

        <section className='Game-section'>
          <Scoreboard
            diceArr={this.state.diceArr}
            updateScore={this.updateScore}
            rollsLeft={this.state.rollsLeft}
            scores={this.state.scores}
            resetGame={this.resetGame}
          />
        </section>
      </div>
    )
  }
}

export default Game
