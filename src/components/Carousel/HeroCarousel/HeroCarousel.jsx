import "./styles/HeroCarousel.css";
import PropTypes from "prop-types";
import VideoPlayer from "./VideoPlayer";

const HeroCarousel = (props) => {
  return (
    <div id="hero-carousel">
      <VideoPlayer selected={props.selected} />
    </div>
  );
};

HeroCarousel.propTypes = {
  selected: PropTypes.bool,
};

export default HeroCarousel;
