import Card from "./Card";
import PropTypes from "prop-types";
import "./styles/CardCarousel.css";

const CardCarousel = (props) => {
  const handleClick = (index) => {
    props.setSelected(index);
    const scrollContainer = document.querySelector("data-scroll-container");
    scrollContainer.scrollTo({
      right: 100,
      behavior: "smooth",
    });
  };

  return (
    <div className="card-carousel" data-scroll-container>
      {props.cards.map((card, index) => {
        return (
          <Card
            key={index}
            metadata={card}
            focused={props.selected === index}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};

CardCarousel.propTypes = {
  cards: PropTypes.array,
  selected: PropTypes.number,
  setSelected: PropTypes.func,
};

export default CardCarousel;
