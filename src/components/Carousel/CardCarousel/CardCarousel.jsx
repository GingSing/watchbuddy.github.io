import Card from "./Card";
import PropTypes from "prop-types";
import { useState } from "react";
import "./styles/CardCarousel.css";

const CardCarousel = (props) => {
  const [position, setPosition] = useState(0);

  return (
    <div className="card-carousel">
      {props.cards.map((card, index) => {
        return (
          <Card
            key={index}
            metadata={card}
            focused={position === index}
            onClick={() => setPosition(index)}
          />
        );
      })}
    </div>
  );
};

CardCarousel.propTypes = {
  cards: PropTypes.array,
};

export default CardCarousel;
