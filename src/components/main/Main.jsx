import React, { useEffect, useState } from "react";
import "./Main.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import boxer1 from "../../assets/photos/boxer1.jpg";
import boxer2 from "../../assets/photos/boxer2.jpg";
import boxer3 from "../../assets/photos/boxer3.jpg";
import boxer4 from "../../assets/photos/boxer4.jpg";
import boxer5 from "../../assets/photos/boxer5.jpg";

const Main = () => {
  const array = [
    { name: "item1", color: "blue", image: boxer1 },
    { name: "item2", color: "red", image: boxer2 },
    { name: "item3", color: "yellow", image: boxer3 },
    { name: "item4", color: "green", image: boxer4 },
    { name: "item5", color: "purple", image: boxer5 },
  ];

  const [mainArray, setMainArray] = useState(array);
  const [popStatus, setPopStatus] = useState("hidePop");
  const [popColor, setPopColor] = useState("");

  const handlePop = () => {
    popStatus === "hidePop" ? setPopStatus("showPop") : setPopStatus("hidePop");
    setPopColor(mainArray[2].color);
  };

  const closePop = () => {
    setPopStatus("hidePop");
  };

  useEffect(() => {
    console.log("mainArray", mainArray);
  }, [mainArray]);

  const moveForward = () => {
    let newArray = mainArray;
    newArray.push(newArray.splice(0, 1)[0]);
    setMainArray([...newArray]);
  };

  const moveBackward = () => {
    let newArray = mainArray;
    newArray.unshift(newArray.splice(-1, 1)[0]);
    setMainArray([...newArray]);
  };

  const moveToMiddle = (index) => {
    console.log(index);
    if (index < 2) {
      for (let i = 0; i < 2 - index; i++) {
        moveBackward();
      }
    }
    if (index > 2) {
      for (let i = 0; i < index - 2; i++) {
        moveForward();
      }
    }
    handlePop(index);
  };

  return (
    <div className="mainContainer">
      <div className="arrayContainer">
        {mainArray.map((value, index) => {
          return (
            <div
              //   style={{ backgroundColor: value.color }}
              className={
                index === 0
                  ? "arrayDiv firstDiv"
                  : index === 1
                  ? "arrayDiv secondDiv"
                  : index === 2
                  ? "arrayDiv middleDiv"
                  : index === 3
                  ? "arrayDiv fourthDiv"
                  : "arrayDiv fifthDiv"
              }
              key={`item-${value.name}`}
              onClick={() => {
                moveToMiddle(index);
              }}
            >
              <img src={value.image} alt="" className="carouselImage" />
            </div>
          );
        })}
      </div>
      <div className="buttonHolder">
        <button onClick={moveForward}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={moveBackward}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div
        id="popUpModal"
        className={popStatus}
        style={{ backgroundColor: popColor }}
      >
        <button onClick={closePop}>close</button>
      </div>
    </div>
  );
};

export default Main;
