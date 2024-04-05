import Card from "./Card";
import PropTypes from "prop-types";
import "./styles/CardCarousel.css";

const CardCarousel = (props) => {
  return (
    <div className="card-carousel">
      {props.cards.map((card, index) => {
        return (
          <Card
            key={index}
            metadata={card}
            focused={props.selected === index}
            onClick={() => props.handleClick(index)}
          />
        );
      })}
    </div>
  );
};

CardCarousel.propTypes = {
  cards: PropTypes.array,
  selected: PropTypes.number,
  handleClick: PropTypes.func,
};

export default CardCarousel;
