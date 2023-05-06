import Dice from "../Dices/Dice";
import styles from "./Game.module.css";
import { useState } from "react";

const NUM_DICE = 5; // Number of Dice components
const ROLLS_LEFT = 3; // Number of chances a user gets

function Game() {
  const [gameState, setGameState] = useState({
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
  });

  function animateDice() {
    setGameState((prevState) => ({ ...prevState, shouldAnimate: true }));
  }

  function shuffleDice() {
    const diceNums = [];

    for (let i = 0; i < NUM_DICE; i++) {
      const randNum = Math.floor(Math.random() * 6 + 1);

      /* Only alter dice that are not locked. Else load Previous Values */

      const diceValue = !gameState.diceLocked[i]
        ? randNum
        : gameState.diceArr[i];
      diceNums.push(diceValue);
    }

    setGameState((prevState) => {
      return {
        ...prevState,
        rollsLeft:
          prevState.rollsLeft > 0
            ? prevState.rollsLeft - 1
            : prevState.rollsLeft
      };
    });

    /* After 1 second, Reset animation trigger(shouldAnimate) and load new Dice Values */

    setTimeout(() => {
      setGameState((prevState) => {
        return {
          ...prevState,
          shouldAnimate: false,
          diceArr: diceNums
        };
      });
    }, 1000);

    animateDice();
  }

  function toggleLockedState(index) {
    setGameState((prevState) => {
      return {
        ...prevState,
        diceLocked: [
          ...prevState.diceLocked.slice(0, index),
          !prevState.diceLocked[index],
          ...prevState.diceLocked.slice(index + 1)
        ]
      };
    });
  }

  const areRollsLeft = gameState.rollsLeft > 0;
  const rollDiceBtn = document.querySelector(".game__btn");
  const shouldAnimate = gameState.shouldAnimate;

  if (!areRollsLeft) {
    rollDiceBtn.setAttribute("disabled", true);
  }

  if (rollDiceBtn) {
    if (shouldAnimate) {
      rollDiceBtn.style.pointerEvents = "none";
    } else {
      setTimeout(() => (rollDiceBtn.style.pointerEvents = "unset"), 500);
    }
  }

  let rollDiceBtnTxt = gameState.rollsLeft;
  rollDiceBtnTxt += gameState.rollsLeft !== 1 ? " Rolls Left" : " Roll Left";

  return (
    <div className={styles.game}>
      <header className={styles.game__header}>
        <h1>Yahtzee!</h1>

        <Dice
          diceArr={gameState.diceArr}
          diceLocked={gameState.diceLocked}
          toggleState={toggleLockedState}
          rollsLeft={gameState.rollsLeft}
          totalRolls={ROLLS_LEFT}
          shouldAnimate={gameState.shouldAnimate}
        />

        <button className={styles.game__btn} onClick={shuffleDice}>
          {rollDiceBtnTxt}
        </button>
      </header>
    </div>
  );
}

export default Game;
