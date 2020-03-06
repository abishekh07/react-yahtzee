import React, { Component } from 'react'
import './Scoreboard.css'
import { calcScore } from './ScoreCalculator'

class Scoreboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isScoreUpdated: false
    }
  }

  handleClick(className) {
    const shouldCalc = this.props.rollsLeft < 3
    let score = calcScore(className, this.props.diceArr, shouldCalc)

    this.props.updateScore(score, className)

    this.setState({
      isScoreUpdated: true
    })

    this.props.resetGame()

    this.setState({
      isScoreUpdated: false
    })
  }

  render() {
    const {
      ones,
      twos,
      threes,
      fours,
      fives,
      sixes,
      threeOfAKind,
      fourOfAKind,
      fullHouse,
      smallStraight,
      largeStraight,
      yahtzee
    } = this.props.scores

    let flag = 0,
      totalScore = 0

    for (let i in this.props.scores) {
      let score = this.props.scores[i]
      if (score === undefined) {
        flag = 1
        break
      }
      totalScore += score
    }

    function printScoreOrMessage(className) {
      return className === undefined ? false : true
    }

    const scoreCounter = {
      position: 'absolute',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%, 0%) scale(1)'
    }

    return (
      <div>
        <div className='score-counter' style={flag === 0 ? scoreCounter : {}}>
          <p>Your Total Score:</p>
          <span>{totalScore}</span>
        </div>
        <div
          className={`Scoreboard ${(this.state.isScoreUpdated ||
            this.props.rollsLeft === 3) &&
            'Scoreboard-disabled'} ${flag === 0 ? 'dim' : ''}`}
        >
          <ul className='upper'>
            <li
              className={`upper-scores ${printScoreOrMessage(ones) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'ones')}
            >
              <span>Ones</span>
              <span>{printScoreOrMessage(ones) ? ones : '1 point per 1'}</span>
            </li>
            <li
              className={`upper-scores ${printScoreOrMessage(twos) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'twos')}
            >
              <span>Twos</span>
              <span>{printScoreOrMessage(twos) ? twos : '2 points per 2'}</span>
            </li>
            <li
              className={`upper-scores ${printScoreOrMessage(threes) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'threes')}
            >
              <span>Threes</span>
              <span>
                {printScoreOrMessage(threes) ? threes : '3 points per 3'}
              </span>
            </li>
            <li
              className={`upper-scores ${printScoreOrMessage(fours) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'fours')}
            >
              <span>Fours</span>
              <span>
                {printScoreOrMessage(fours) ? fours : '4 points per 4'}
              </span>
            </li>
            <li
              className={`upper-scores ${printScoreOrMessage(fives) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'fives')}
            >
              <span>Fives</span>
              <span>
                {printScoreOrMessage(fives) ? fives : '5 points per 5'}
              </span>
            </li>
            <li
              className={`upper-scores ${printScoreOrMessage(sixes) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'sixes')}
            >
              <span>Sixes</span>
              <span>
                {printScoreOrMessage(sixes) ? sixes : '6 points per 6'}
              </span>
            </li>
          </ul>
          <ul className='lower'>
            <li
              className={`lower-scores ${printScoreOrMessage(threeOfAKind) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'threeOfAKind')}
            >
              <span>Three of a kind</span>
              <span>
                {printScoreOrMessage(threeOfAKind)
                  ? threeOfAKind
                  : 'Sum all dice if 3 are the same'}
              </span>
            </li>
            <li
              className={`lower-scores ${printScoreOrMessage(fourOfAKind) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'fourOfAKind')}
            >
              <span>Four of a kind</span>
              <span>
                {printScoreOrMessage(fourOfAKind)
                  ? fourOfAKind
                  : 'Sum all dice if 4 are the same'}
              </span>
            </li>
            <li
              className={`lower-scores ${printScoreOrMessage(smallStraight) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'smallStraight')}
            >
              <span>Small Straight</span>
              <span>
                {printScoreOrMessage(smallStraight)
                  ? smallStraight
                  : '30 points for a small straight'}
              </span>
            </li>
            <li
              className={`lower-scores ${printScoreOrMessage(largeStraight) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'largeStraight')}
            >
              <span>Large Straight</span>
              <span>
                {printScoreOrMessage(largeStraight)
                  ? largeStraight
                  : '40 points for a large straight'}
              </span>
            </li>
            <li
              className={`lower-scores ${printScoreOrMessage(fullHouse) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'fullHouse')}
            >
              <span>Full House</span>
              <span>
                {printScoreOrMessage(fullHouse)
                  ? fullHouse
                  : '25 points for a full house'}
              </span>
            </li>
            <li
              className={`lower-scores ${printScoreOrMessage(yahtzee) &&
                'disabled'}`}
              onClick={this.handleClick.bind(this, 'yahtzee')}
            >
              <span>Yahtzee</span>
              <span>
                {printScoreOrMessage(yahtzee)
                  ? yahtzee
                  : '50 points for yahtzee'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Scoreboard
