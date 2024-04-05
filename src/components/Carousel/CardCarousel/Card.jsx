import PropTypes from "prop-types";
import "./styles/Card.css";
import classNames from "classnames";

const Card = (props) => {
  console.log(props);
  return (
    <div
      style={{
        background: `url(/assets/${props.metadata.src})`,
        backgroundSize: "cover",
      }}
      className={classNames("card", {
        focused: props.focused,
      })}
      onClick={props.onClick}
    ></div>
  );
};

Card.propTypes = {
  metadata: PropTypes.shape({
    title: PropTypes.string,
    src: PropTypes.string,
  }),
  focused: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
