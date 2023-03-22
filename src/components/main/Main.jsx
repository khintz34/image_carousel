import React, { useEffect, useState, useRef } from "react";
import "./Main.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCircle as closedCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faCircle as openCircle,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import boxer1 from "../../assets/photos/boxer1.jpg";
import boxer2 from "../../assets/photos/boxer2.jpg";
import boxer3 from "../../assets/photos/boxer3.jpg";
import boxer4 from "../../assets/photos/boxer4.jpg";
import boxer5 from "../../assets/photos/boxer5.jpg";

const Main = () => {
  const array = [
    { name: "eyes", color: "blue", image: boxer1, num: 0 },
    { name: "poop", color: "red", image: boxer2, num: 1 },
    { name: "cree", color: "yellow", image: boxer3, num: 2 },
    { name: "puppy", color: "green", image: boxer4, num: 3 },
    { name: "depot", color: "purple", image: boxer5, num: 4 },
  ];

  const [mainArray, setMainArray] = useState(array);
  const [popStatus, setPopStatus] = useState("hidePop");
  const [newImage, setNewImage] = useState([]);
  const [viewingImage, setViewingImage] = useState(2);
  const inputRef = useRef();

  const handlePop = () => {
    // popStatus === "hidePop" ? setPopStatus("showPop") : setPopStatus("hidePop");
    setPopStatus("showPop");
  };

  const closePop = () => {
    setPopStatus("hidePop");
  };

  const handleImageInputs = (e) => {
    console.log(e.target.files[0]);
    setNewImage(e.target.files[0]);
  };

  const handleAddImage = () => {
    if (newImage.length < 1) return;
    let newArray = mainArray;
    let urlCreate = URL.createObjectURL(newImage);
    let newObject = {
      name: newImage.name,
      color: null,
      image: urlCreate,
      num: mainArray.length,
    };
    newArray.push(newObject);
    setMainArray([...newArray]);
    inputRef.current.value = "";
    setNewImage([]);
  };

  useEffect(() => {
    console.log("mainArray", mainArray);
  }, [mainArray]);

  const moveForward = (clicked) => {
    console.log("forward");
    let newArray = mainArray;
    newArray.push(newArray.splice(0, 1)[0]);
    setMainArray([...newArray]);

    if (clicked) {
      let newNum = viewingImage;
      newNum++;
      if (newNum > mainArray.length - 1) newNum = 0;
      setViewingImage(newNum);
    }
  };

  const moveBackward = (clicked) => {
    console.log("backward");
    let newArray = mainArray;
    newArray.unshift(newArray.splice(-1, 1)[0]);
    setMainArray([...newArray]);
    if (clicked) {
      let newNum = viewingImage;
      newNum--;
      if (newNum < 0) newNum = mainArray.length - 1;
      setViewingImage(newNum);
    }
  };

  const moveToMiddle = (index, open) => {
    console.log(mainArray[index]);
    setViewingImage(mainArray[index].num);
    console.log("middle Index", index);
    if (index < 2) {
      for (let i = 0; i < 2 - index; i++) {
        moveBackward(false);
      }
    }
    if (index > 2) {
      for (let i = 0; i < index - 2; i++) {
        moveForward(false);
      }
    }
    if (open) handlePop(index);
  };

  const findMiddle = (i) => {
    console.log("finding indez");
    mainArray.map((val, index) => {
      if (val.num === i) {
        console.log(mainArray[index]);
        moveToMiddle(index, false);
      }
    });
  };

  return (
    <div className="mainContainer">
      <div className="arrayContainer">
        <button onClick={() => moveForward(true)} className="controlBtn">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {mainArray.map((value, index) => {
          if (index > 4) return;
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
                moveToMiddle(index, true);
              }}
            >
              <img src={value.image} alt="" className="carouselImage" />
            </div>
          );
        })}
        <button onClick={() => moveBackward(true)} className="controlBtn">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div id="carouselIndicatorsContainer">
        {(() => {
          let dots = [];
          for (let i = 0; i < mainArray.length; i++) {
            console.log("viewingImg: ", viewingImage);
            if (i === viewingImage) {
              dots.push(
                <FontAwesomeIcon
                  icon={closedCircle}
                  key={`dots-${i}-closed`}
                  className="indicator"
                  onClick={() => findMiddle(i)}
                />
              );
            } else {
              dots.push(
                <FontAwesomeIcon
                  icon={openCircle}
                  key={`dots-${i}-open`}
                  className="indicator"
                  onClick={() => findMiddle(i)}
                />
              );
            }
          }
          return dots;
        })()}
      </div>

      <div
        id="popUpModal"
        className={popStatus}
        style={{ backgroundImage: `url(${mainArray[2].image})` }}
      >
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={closePop}
          className="closePopBtn"
        />
      </div>
      <div className="buttonContainer">
        <input
          type="file"
          id="imageAccept"
          accept="image/*"
          onChange={handleImageInputs}
          ref={inputRef}
        />
        <button onClick={handleAddImage} className="addImgBtn">
          Add Image
        </button>
      </div>
    </div>
  );
};

export default Main;
