import { useState, useRef } from "react";
import "./SliderMobile.css";
import SliderImageMobile from "../resuse/sliderImage-mobile/SliderImageMobile";
import { imageArray } from "../../assets/OriginalArray/OriginalArray";

const Slider = () => {
  const [pressed, setPressed] = useState(false);
  const [startX, setStartX] = useState(0);
  const wrapperRef = useRef();
  const inputRef = useRef();
  const [mainArray, setMainArray] = useState(imageArray);
  const [newImage, setNewImage] = useState([]);

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

  return (
    <div id="sliderContainer">
      <div
        ref={wrapperRef}
        className="wrapper"
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
          let extraClass;
          if (index === 0) {
            extraClass = "firstImage";
          } else if (index === mainArray.length - 1) {
            extraClass = "lastImage";
          }

          return (
            <SliderImageMobile
              name={val.name}
              extraClass={extraClass}
              image={val.image}
              key={val.name + "sliderMobile"}
            />
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
