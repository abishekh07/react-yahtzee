import styles from "./Die.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix
} from "@fortawesome/free-solid-svg-icons";

function Die({
  isLocked,
  shouldAnimate,
  hasGameStarted,
  val,
  idx,
  toggleState
}) {
  function callToggleState() {
    toggleState(idx);
  }

  const diceNames = [
    faDiceOne,
    faDiceTwo,
    faDiceThree,
    faDiceFour,
    faDiceFive,
    faDiceSix
  ];

  const dieSide = diceNames[val - 1];
  const shouldAnimateDie = hasGameStarted && shouldAnimate && !isLocked;
  const shouldDisableDie = hasGameStarted && isLocked;

  let classes = `${styles.die}`;
  if (shouldAnimateDie) classes += ` ${styles["die__animate"]} `;
  if (shouldDisableDie) classes += ` ${styles["die__disabled"]} `;

  return (
    <FontAwesomeIcon
      icon={dieSide}
      className={classes}
      onClick={hasGameStarted ? callToggleState : undefined}
    />
  );
}

export default Die;
