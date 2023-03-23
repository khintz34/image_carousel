import "../../SliderMobile/SliderMobile.css";

const SliderImageMobile = (props) => {
  return (
    <div key={props.name + "slider"} className={`slider ${props.extraClass}`}>
      <img src={props.image} alt="" className="carouselImage" />
    </div>
  );
};

export default SliderImageMobile;
