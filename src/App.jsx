import "./App.css";
import SliderLarge from "./components/SliderLarge/SliderLarge";
import SliderMobile from "./components/SliderMobile/SliderMobile";

function App() {
  const width = screen.width;
  return (
    <div className="App">
      {width < 500 ? <SliderMobile /> : <SliderLarge />}
    </div>
  );
}

export default App;
