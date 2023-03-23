import React, { useEffect, useState, useRef } from "react";
import "./SliderLarge.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCircle as closedCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faCircle as openCircle,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imageArray as array } from "../../assets/OriginalArray/OriginalArray";

const SliderLarge = () => {
  const [mainArray, setMainArray] = useState(array);
  const [popStatus, setPopStatus] = useState("hidePop");
  const [newImage, setNewImage] = useState([]);
  const [viewingImage, setViewingImage] = useState(2);
  const inputRef = useRef();
  const [screenWidth, setScreenWidth] = useState(screen.width);
  const [middleDiv, setMiddleDiv] = useState(2);

  const handlePop = () => {
    setPopStatus("showPop");
  };

  const closePop = () => {
    setPopStatus("hidePop");
  };

  useEffect(() => {
    if (screenWidth < 1000) {
      setMiddleDiv(1);
      setViewingImage(1);
    }
  }, []);

  const handleImageInputs = (e) => {
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

  const moveForward = (clicked) => {
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
    setViewingImage(mainArray[index].num);
    if (index < middleDiv) {
      for (let i = 0; i < middleDiv - index; i++) {
        moveBackward(false);
      }
    }
    if (index > middleDiv) {
      for (let i = 0; i < index - middleDiv; i++) {
        moveForward(false);
      }
    }
    if (open) handlePop(index);
  };

  const findMiddle = (i) => {
    mainArray.map((val, index) => {
      if (val.num === i) {
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
          if (screenWidth < 1000) {
            if (index > 2) return;
            return (
              <div
                className={
                  index === 0
                    ? "arrayDiv firstDiv"
                    : index === 1
                    ? "arrayDiv middleDiv"
                    : "arrayDiv fifthDiv"
                }
                key={`item-${value.name}`}
                onClick={() => {
                  moveToMiddle(index, false);
                }}
              >
                <img src={value.image} alt="" className="carouselImage" />
              </div>
            );
          }
          if (index > 4) return;
          return (
            <div
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
        style={{ backgroundImage: `url(${mainArray[middleDiv].image})` }}
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

export default SliderLarge;
