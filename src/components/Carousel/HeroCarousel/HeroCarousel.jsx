import PropTypes from "prop-types";
import "./styles/HeroCarousel.css";
import VideoPlayer from "./VideoPlayer";

const HeroCarousel = (props) => {
  return (
    <div id="hero-carousel">
      {props.content.map((currContent, index) => {
        return (
          <div key={index}>
            <VideoPlayer />
          </div>
        );
      })}
    </div>
  );
};

HeroCarousel.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      imageSrc: PropTypes.string,
    })
  ),
};

export default HeroCarousel;
