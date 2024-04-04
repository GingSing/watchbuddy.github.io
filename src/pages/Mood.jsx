import CardCarousel from "../components/Carousel/CardCarousel/CardCarousel";
import HeroCarousel from "../components/Carousel/HeroCarousel/HeroCarousel";
import moodData from '../components/mood_data.json'
import "./styles/Mood.css";

const MOOD_CARDS = moodData.map(data => ({"title": data.name}))

const HERO_CAROUSEL_CARDS = [
  {
    imageSrc: "bluebloods.png",
  },
];

const Mood = () => {
  return (
    <div id="mood-page-wrapper">
      <div id="mood-page">
        <div>
          <img
            className="navbar"
            src="/assets/p-navbar.png"
            alt="p-navbar.png"
          />
        </div>

        <div>
          <HeroCarousel content={HERO_CAROUSEL_CARDS} />
        </div>
        <div className="mood-carousel-wrapper">
          <CardCarousel cards={MOOD_CARDS} />
        </div>
      </div>
    </div>
  );
};

export default Mood;
