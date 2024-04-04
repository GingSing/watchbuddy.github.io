import PropTypes from "prop-types";
import "./styles/Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <span>{props.metadata.title}</span>
    </div>
  );
};

Card.propTypes = {
  metadata: PropTypes.shape({
    title: PropTypes.string,
  }),
};

export default Card;
