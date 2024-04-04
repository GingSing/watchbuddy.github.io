import PropTypes from "prop-types";
import "./styles/HeroImage.css";

const HeroImage = (props) => {
  return (
    <img
      className="hero-image"
      src={`/assets/${props.imageSrc}`}
      alt={props.imageSrc}
    />
  );
};

HeroImage.propTypes = {
  imageSrc: PropTypes.string,
  focused: PropTypes.bool,
};

export default HeroImage;
