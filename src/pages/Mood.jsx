import CardCarousel from "../components/Carousel/CardCarousel/CardCarousel";
import HeroCarousel from "../components/Carousel/HeroCarousel/HeroCarousel";
import "./styles/Mood.css";

const MOOD_CARDS = [
  {
    title: "Sad",
  },
  {
    title: "Happy",
  },
  {
    title: "Cloudy",
  },
];

function Mood() {
  return (
    <div id="mood-page-wrapper">
      <div id="mood-page">
        {/* <div><img src=''></div> */}

        <div>
          <HeroCarousel content={[{ imageSrc: "" }]} />
        </div>
        <div>
          <CardCarousel cards={MOOD_CARDS} />
        </div>
      </div>
    </div>
  );
}

export default Mood;
