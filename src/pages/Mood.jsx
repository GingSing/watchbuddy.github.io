import { useState } from "react";
import CardCarousel from "../components/Carousel/CardCarousel/CardCarousel";
import HeroCarousel from "../components/Carousel/HeroCarousel/HeroCarousel";
import moodData from "../components/mood_data.json";
import "./styles/Mood.css";

const MOOD_CARDS = moodData.map((data) => ({
  title: data.name,
  src: data.src,
}));

const Mood = () => {
  const [selected, setSelected] = useState(0);
  const handleClick = (index) => {
    setSelected(index);
    const scrollContainer = document.querySelector("[data-scroll-container]");
    scrollContainer.scrollTo({
      left: index * 250,
      behavior: "smooth",
    });
  };
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
          <HeroCarousel content={MOOD_CARDS} selected={selected} />
        </div>
        <div className="mood-content">
          <div className="mood-carousel-wrapper" data-scroll-container>
            <CardCarousel
              cards={MOOD_CARDS}
              selected={selected}
              handleClick={handleClick}
            />
          </div>
          <div className="mood-content-next">&#10095;</div>
        </div>
      </div>
    </div>
  );
};

export default Mood;
