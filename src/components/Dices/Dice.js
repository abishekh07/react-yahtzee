import Die from "./Die";
import styles from "./Dice.module.css";

function Dice({
  diceArr,
  diceLocked,
  toggleState,
  rollsLeft,
  totalRolls,
  shouldAnimate
}) {
  return (
    <div className={styles.dice}>
      {diceArr.map((die, index) => (
        <Die
          key={index}
          val={die}
          isLocked={diceLocked[index]}
          toggleState={toggleState}
          idx={index}
          hasGameStarted={rollsLeft < totalRolls}
          shouldAnimate={shouldAnimate}
        />
      ))}
    </div>
  );
}

export default Dice;
