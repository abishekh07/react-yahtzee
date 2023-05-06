import { calcScore } from "./ScoreCalculator.js";
import { useState } from "react";
import styles from "./Scoreboard.module.css";

function Scoreboard({ diceArr, updateScore, rollsLeft, scores, resetGame }) {
  const [isScoreUpdated, setIsScoreUpdated] = useState(false);

  function handleClick(className) {
    const shouldCalc = rollsLeft < 3;
    let score = calcScore(className, diceArr, shouldCalc);

    updateScore(score, className);

    setIsScoreUpdated(true);

    resetGame();

    setIsScoreUpdated(false);
  }

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
  } = scores;

  let flag = 0;
  let totalScore = 0;

  for (let i in scores) {
    let score = scores[i];

    if (score === undefined) {
      flag = 1;
      break;
    }

    totalScore += score;
  }

  function printScoreOrMessage(className) {
    return className === undefined ? false : true;
  }

  const scoreCounter = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, 0%) scale(1)"
  };

  return (
    <div>
      <div
        className={styles["score-counter"]}
        style={flag === 0 ? scoreCounter : {}}
      >
        <p>Your Total Score:</p>
        <span>{totalScore}</span>
      </div>
      <div
        className={`${styles.scoreboard} ${
          (isScoreUpdated || rollsLeft === 3) && styles["scoreboard__disabled"]
        } ${flag === 0 ? styles.dim : ""}`}
      >
        <ul className={styles.upper}>
          <li
            className={`${styles["upper-scores"]} ${
              printScoreOrMessage(ones) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "ones")}
          >
            <span>Ones</span>
            <span>{printScoreOrMessage(ones) ? ones : "1 point per 1"}</span>
          </li>
          <li
            className={`${styles["upper-scores"]} ${
              printScoreOrMessage(twos) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "twos")}
          >
            <span>Twos</span>
            <span>{printScoreOrMessage(twos) ? twos : "2 points per 2"}</span>
          </li>
          <li
            className={`${styles["upper-scores"]} ${
              printScoreOrMessage(threes) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "threes")}
          >
            <span>Threes</span>
            <span>
              {printScoreOrMessage(threes) ? threes : "3 points per 3"}
            </span>
          </li>
          <li
            className={`${styles["upper-scores"]} ${
              printScoreOrMessage(fours) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "fours")}
          >
            <span>Fours</span>
            <span>{printScoreOrMessage(fours) ? fours : "4 points per 4"}</span>
          </li>
          <li
            className={`${styles["upper-scores"]} ${
              printScoreOrMessage(fives) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "fives")}
          >
            <span>Fives</span>
            <span>{printScoreOrMessage(fives) ? fives : "5 points per 5"}</span>
          </li>
          <li
            className={`${styles["upper-scores"]} ${
              printScoreOrMessage(sixes) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "sixes")}
          >
            <span>Sixes</span>
            <span>{printScoreOrMessage(sixes) ? sixes : "6 points per 6"}</span>
          </li>
        </ul>
        <ul className={styles.lower}>
          <li
            className={`${styles["lower-scores"]} ${
              printScoreOrMessage(threeOfAKind) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "threeOfAKind")}
          >
            <span>Three of a kind</span>
            <span>
              {printScoreOrMessage(threeOfAKind)
                ? threeOfAKind
                : "Sum all dice if 3 are the same"}
            </span>
          </li>
          <li
            className={`${styles["lower-scores"]} ${
              printScoreOrMessage(fourOfAKind) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "fourOfAKind")}
          >
            <span>Four of a kind</span>
            <span>
              {printScoreOrMessage(fourOfAKind)
                ? fourOfAKind
                : "Sum all dice if 4 are the same"}
            </span>
          </li>
          <li
            className={`${styles["lower-scores"]} ${
              printScoreOrMessage(smallStraight) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "smallStraight")}
          >
            <span>Small Straight</span>
            <span>
              {printScoreOrMessage(smallStraight)
                ? smallStraight
                : "30 points for a small straight"}
            </span>
          </li>
          <li
            className={`${styles["lower-scores"]} ${
              printScoreOrMessage(largeStraight) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "largeStraight")}
          >
            <span>Large Straight</span>
            <span>
              {printScoreOrMessage(largeStraight)
                ? largeStraight
                : "40 points for a large straight"}
            </span>
          </li>
          <li
            className={`${styles["lower-scores"]} ${
              printScoreOrMessage(fullHouse) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "fullHouse")}
          >
            <span>Full House</span>
            <span>
              {printScoreOrMessage(fullHouse)
                ? fullHouse
                : "25 points for a full house"}
            </span>
          </li>
          <li
            className={`${styles["lower-scores"]} ${
              printScoreOrMessage(yahtzee) && styles.disabled
            }`}
            onClick={handleClick.bind(this, "yahtzee")}
          >
            <span>Yahtzee</span>
            <span>
              {printScoreOrMessage(yahtzee) ? yahtzee : "50 points for yahtzee"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Scoreboard;
