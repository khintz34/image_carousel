import React, { useEffect, useState } from "react";
import "./Main.css";

const Main = () => {
  const array = [
    { name: "item1", color: "blue" },
    { name: "item2", color: "red" },
    { name: "item3", color: "yellow" },
    { name: "item4", color: "green" },
    { name: "item5", color: "purple" },
  ];

  const [mainArray, setMainArray] = useState(array);

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

  return (
    <div className="mainContainer">
      <div className="arrayContainer">
        {mainArray.map((value, index) => {
          return (
            <div
              style={{ backgroundColor: value.color }}
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
                alert(value.color);
              }}
            ></div>
          );
        })}
      </div>
      <div className="buttonHolder">
        <button onClick={moveForward}>Forward</button>
        <button onClick={moveBackward}>Backward</button>
      </div>
    </div>
  );
};

export default Main;
