import Card from "./Card";
import PropTypes from "prop-types";
import { useState } from "react";
import "./styles/CardCarousel.css";

const CardCarousel = (props) => {
  const position = useState(0);

  return (
    <div className="card-carousel">
      {props.cards.map((card, index) => {
        return <Card key={index} metadata={card} position={position} />;
      })}
    </div>
  );
};

CardCarousel.propTypes = {
  cards: PropTypes.array,
};

export default CardCarousel;
