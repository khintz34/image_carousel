import "./App.css";
import Main from "./components/main/Main";
import Slider from "./components/Slider/Slider";

function App() {
  const width = screen.width;
  return <div className="App">{width < 500 ? <Slider /> : <Main />}</div>;
}

export default App;
