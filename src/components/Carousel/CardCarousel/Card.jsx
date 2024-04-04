import PropTypes from "prop-types";
import "./styles/Card.css";
import classNames from "classnames";

const Card = (props) => {
  return (
    <div
      className={classNames("card", {
        focused: props.focused,
      })}
      onClick={props.onClick}
    >
      <span>{props.metadata.title}</span>
    </div>
  );
};

Card.propTypes = {
  metadata: PropTypes.shape({
    title: PropTypes.string,
  }),
  focused: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
