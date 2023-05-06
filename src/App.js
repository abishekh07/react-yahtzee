import styles from "./App.module.css";
import Game from "./components/GameLogic/Game";

function App() {
  return (
    <div className={styles.app}>
      <Game />
    </div>
  );
}

export default App;
