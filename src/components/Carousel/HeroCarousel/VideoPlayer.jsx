import { useState, useEffect, useRef, useMemo } from "react";
import "./styles/VideoPlayer.css"; // Import CSS for styling
import PropTypes from "prop-types";
import moodData from "../../mood_data.json";

// The main functional component
const VideoPlayer = ({ selected }) => {
  // State hooks for various functionalities within the component
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0); // Index for the currently playing trailer
  const [crossfade, setCrossfade] = useState(false); // State to trigger crossfade transitions
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Index of the current video for display
  const [isMouseOver, setIsMouseOver] = useState(false);
  const peekviewRef = useRef(null);

  const playlists = moodData[selected];

  // References to video elements to control their playback
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  // Memoizing an array of video refs for efficient re-rendering
  const videoRefs = useMemo(() => [videoRef1, videoRef2], []);

  // Utility function to debounce a function
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  // Debounced mouse leave event handler
  const debouncedHandleMouseLeave = useRef(
    debounce(() => {
      setIsMouseOver(false);
    }, 300)
  ).current;

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    debouncedHandleMouseLeave();
  };

  useEffect(() => {
    setCurrentTrailerIndex(0); // Reset trailer index when playlist changes
    setCurrentVideoIndex(0); // Reset video index when playlist changes
    setCrossfade(true); // Trigger crossfade to start playing the first video
  }, [selected]); // Trigger effect when selected mood changes

  // Effect hook for handling the crossfade transition between trailers
  useEffect(() => {
    const nextVideoIndex = currentVideoIndex === 0 ? 1 : 0; // Determine the next video index for the transition
    if (crossfade && videoRefs[nextVideoIndex].current) {
      // If crossfade is triggered and the next video element is available
      videoRefs[nextVideoIndex].current.src =
        playlists.titles[currentTrailerIndex].trailer_url;
      // Set the source of the next video
      videoRefs[nextVideoIndex].current.play(); // Play the next video

      setCurrentVideoIndex(nextVideoIndex); // Update the current video index to the next one
      setCrossfade(false); // Reset crossfade state

      // Handler for when the current video ends
      const onEndedHandler = () => {
        videoRefs[currentVideoIndex].current.pause();
        videoRefs[currentVideoIndex].current.currentTime = 0;
        videoRefs[currentVideoIndex].current.removeEventListener(
          "ended",
          onEndedHandler
        );
      };
      videoRefs[currentVideoIndex].current.addEventListener(
        "ended",
        onEndedHandler
      );
    }
  }, [crossfade, currentTrailerIndex, currentVideoIndex, videoRefs, playlists]);

  // Handler for navigating to the next trailer or playlist
  const handleNext = () => {
    if (currentTrailerIndex === playlists.titles.length - 1) {
      setCurrentTrailerIndex(0);
      setCurrentVideoIndex(0);
      setCrossfade(true);
    } else {
      // Move to the next trailer in the current playlist
      setCurrentTrailerIndex((prevIndex) => prevIndex + 1);
      setCrossfade(true);
    }
  };

  // Render method
  return (
    <div
      className="video-player"
      ref={peekviewRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {videoRefs.map((ref, index) => (
        <div
          key={index}
          className={`video-container ${
            currentVideoIndex === index ? "visible" : "hidden"
          }`}
          style={{
            transition: `opacity 1s ease, z-index 0.5s ease`, // Apply transition effect
          }}
        >
          <video ref={ref} className="video" autoPlay muted>
            <source src={playlists.titles[currentTrailerIndex].trailer_url} />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay" />
          <div className={isMouseOver ? "text-overlay" : "hidden"}>
            <b>{playlists.titles[currentTrailerIndex].title}</b>
            <p>{playlists.titles[currentTrailerIndex].year}</p>
            <p>
              {playlists.titles[currentTrailerIndex].genres} |
              {playlists.titles[currentTrailerIndex].length} |
              {playlists.titles[currentTrailerIndex].rating}
            </p>
            <p className="description">
              {playlists.titles[currentTrailerIndex].description}
            </p>
            <button
              className="button"
              onClick={() => videoRefs[index].current.play()}
            >
              WATCH NOW
            </button>
            <button className="button" onClick={handleNext}>
              SKIP
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

VideoPlayer.propTypes = {
  selected: PropTypes.bool,
};

export default VideoPlayer; // Exporting the component for use in other parts of the application
