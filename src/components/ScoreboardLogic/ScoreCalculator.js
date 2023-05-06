function calcScore(type, diceArr, shouldCalc) {
  let score = 0;
  let obj = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  let arr = [...diceArr];

  if (shouldCalc) {
    switch (type) {
      case "ones":
        score = updateLowerTier(1, diceArr);

        break;

      case "twos":
        score = updateLowerTier(2, diceArr);

        break;

      case "threes":
        score = updateLowerTier(3, diceArr);

        break;

      case "fours":
        score = updateLowerTier(4, diceArr);

        break;

      case "fives":
        score = updateLowerTier(5, diceArr);

        break;

      case "sixes":
        score = updateLowerTier(6, diceArr);

        break;

      case "threeOfAKind":
        score = update3Or4OfAKind(3, diceArr);

        break;

      case "fourOfAKind":
        score = update3Or4OfAKind(4, diceArr);

        break;

      case "fullHouse":
        diceArr.forEach((item) => (obj[item] = obj[item] + 1));

        let cnt = [];

        for (let i in obj) {
          if (obj[i] === 2) cnt[0] = 1;
          else if (obj[i] === 3) cnt[1] = 1;
          obj[i] = 0;
        }

        score = cnt[0] === 1 && cnt[1] === 1 ? 25 : 0;

        break;

      case "smallStraight":
        let counter = 0;
        let found = false;

        arr.sort();

        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i + 1] === arr[i] + 1) counter++;
          else if (arr[i + 1] === arr[i]) continue;
          else counter = 0;

          if (counter === 3) {
            found = true;
            break;
          }
        }

        score = found ? 30 : 0;

        break;

      case "largeStraight":
        let flag = 0;
        arr.sort();

        for (let i = arr.length - 1; i > 0; i--) {
          if (arr[i] - arr[i - 1] !== 1) {
            flag = 1;
            break;
          }
        }

        score = flag ? 0 : 40;

        break;

      case "yahtzee":
        const isYahtzee = diceArr.map((item) => {
          if (item !== diceArr[0]) return 0;
          return "";
        });

        score = !isYahtzee.includes(0) ? 50 : 0;

        break;

      default:
        console.log("Yahtzee is Fun");
    }
  }

  return score;
}

function updateLowerTier(n, arr) {
  let score = 0;

  arr.forEach((item) => {
    if (item === n) score += item;
  });

  return score;
}

function update3Or4OfAKind(n, arr) {
  const obj = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  let score = 0;

  arr.forEach((item) => (obj[item] = obj[item] + 1));

  for (let i in obj) {
    if (obj[i] >= n) {
      score = arr.reduce((acc, curr) => acc + curr);
      break;
    }
  }
  return score;
}

export { calcScore };
