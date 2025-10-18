import GameBoard from "./components/GameBoard/GameBoard";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import RuleBoard from "./components/RuleBoard/RuleBoard";
import "./App.scss"
import RecordBoard from "./components/RecordBoard/RecordBoard";

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <div className="content">
        <div className="left">
          <GameBoard/>
        </div>
        <div className="right">
          <RuleBoard/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
