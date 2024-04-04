import HeroImage from "./HeroImage";
import PropTypes from "prop-types";
import "./styles/HeroCarousel.css";

const HeroCarousel = (props) => {
  return (
    <div id="hero-carousel">
      {props.content.map((currContent, index) => {
        return (
          <div key={index}>
            <HeroImage imageSrc={currContent.imageSrc} />
            <div id="hero-meta">
              <button>Watch Now</button>
            </div>
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
