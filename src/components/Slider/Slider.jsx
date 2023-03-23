import { useState, useRef } from "react";
import "./Slider.css";

import boxer1 from "../../assets/photos/boxer1.jpg";
import boxer2 from "../../assets/photos/boxer2.jpg";
import boxer3 from "../../assets/photos/boxer3.jpg";
import boxer4 from "../../assets/photos/boxer4.jpg";
import boxer5 from "../../assets/photos/boxer5.jpg";

const Slider = () => {
  const imageArray = [
    { name: "eyes", image: boxer1, num: 0 },
    { name: "poop", image: boxer2, num: 1 },
    { name: "cree", image: boxer3, num: 2 },
    { name: "puppy", image: boxer4, num: 3 },
    { name: "depot", image: boxer5, num: 4 },
  ];
  const [pressed, setPressed] = useState(false);
  const [startX, setStartX] = useState(0);
  const [cursor, setCursor] = useState("cursor");
  const wrapperRef = useRef();
  const inputRef = useRef();
  const [mainArray, setMainArray] = useState(imageArray);
  const [newImage, setNewImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const checkPositions = (e, index) => {
    const position = e.target.getBoundingClientRect();

    if (position.top >= 0 && position.bottom <= window.innerHeight) {
      setCurrentIndex(index + 1);
      console.log("yes");
    }
  };

  return (
    <div id="sliderContainer">
      <div
        ref={wrapperRef}
        className="wrapper"
        onMouseDown={(e) => {
          setPressed(true);
          setStartX(e.clientX);
          setCursor("grabbing");
          //   console.log(e);
        }}
        onMouseLeave={(e) => {
          setPressed(false);
        }}
        onMouseUp={(e) => {
          setPressed(false);
          setCursor("grab");
        }}
        onMouseMove={(e) => {
          if (!pressed) {
            return;
          }

          wrapperRef.scrollLeft += startX - e.clientX;
        }}
        onTouchEnd={(e) => {
          setPressed(false);
        }}
        onTouchStart={(e) => {
          setPressed(true);
          setStartX(e.touches[0].pageX);
        }}
        onTouchMove={(e) => {
          if (!pressed) {
            console.log(startX - e.touches[0].pageX);
            return;
          }

          wrapperRef.scrollLeft += startX - e.touches[0].pageX;
        }}
      >
        {mainArray.map((val, index) => {
          if (index === 0) {
            return (
              <div
                key={val.name + "slider"}
                className="slider firstImage"
                onClick={(e) => checkPositions(e, index)}
              >
                <img src={val.image} alt="" className="carouselImage" />
              </div>
            );
          } else if (index === mainArray.length - 1) {
            return (
              <div
                key={val.name + "slider"}
                className="slider lastImage"
                onClick={(e) => checkPositions(e, index)}
              >
                <img src={val.image} alt="" className="carouselImage" />
              </div>
            );
          }
          return (
            <div
              key={val.name + "slider"}
              className="slider"
              onClick={(e) => checkPositions(e, index)}
            >
              <img src={val.image} alt="" className="carouselImage" />
            </div>
          );
        })}
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

export default Slider;
