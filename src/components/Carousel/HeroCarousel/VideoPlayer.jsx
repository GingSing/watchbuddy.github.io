import  { useState, useEffect, useRef, useMemo } from 'react'
import './styles/VideoPlayer.css' // Import CSS for styling
import moodData from '../../mood_data.json'

// Slicing the first 11 items from the imported carousel data to be used as playlists
const playlists = moodData

// The main functional component
const VideoPlayer = () => {
  // State hooks for various functionalities within the component
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0) // Current playlist index
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0) // Index for the currently playing trailer
  const [crossfade, setCrossfade] = useState(false) // State to trigger crossfade transitions
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0) // Index of the current video for display
  const [isMouseOver, setIsMouseOver] = useState(false)
  const peekviewRef = useRef(null)

  // References to video elements to control their playback
  const videoRef1 = useRef(null)
  const videoRef2 = useRef(null)

  // Memoizing an array of video refs for efficient re-rendering
  const videoRefs = useMemo(() => [videoRef1, videoRef2], [])

  // Utility function to debounce a function
  function debounce(func, delay) {
    let timeoutId
    return function (...args) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }

  // Debounced mouse leave event handler
  const debouncedHandleMouseLeave = useRef(
    debounce(() => {
      setIsMouseOver(false)
    }, 300)
  ).current

  const handleMouseEnter = () => {
    setIsMouseOver(true)
  }

  const handleMouseLeave = () => {
     debouncedHandleMouseLeave()
  }

  // Effect hook to handle the logic for transitioning to the next trailer based on the current video playback time
  useEffect(() => {
    const handleNextTrailer = () => {
      const currentVideo = videoRefs[currentVideoIndex].current
      let checkTransitionStart = currentVideo
        ? currentVideo.duration - currentVideo.currentTime <= 1
        : 0

      if (checkTransitionStart) {
        if (
          currentTrailerIndex ===
          playlists[currentPlaylistIndex].titles.length - 1
        ) {
          if (currentPlaylistIndex === playlists.length - 1) {
            setCurrentPlaylistIndex(0) // Reset to the first playlist if it's the last one
          } else {
            setCurrentPlaylistIndex(currentPlaylistIndex + 1) // Move to the next playlist
          }
          setCurrentTrailerIndex(0) // Reset trailer index when moving to the next playlist
        } else {
          setCurrentTrailerIndex(currentTrailerIndex + 1) // Move to the next trailer in the current playlist
        }
        setCrossfade(true) // Trigger crossfade effect
      }
    }
    if (videoRefs[currentVideoIndex].current)
      videoRefs[currentVideoIndex].current.addEventListener(
        'timeupdate',
        handleNextTrailer
      )

    // Cleanup function to remove event listener
    return () => {
      if (videoRefs[currentVideoIndex].current)
        videoRefs[currentVideoIndex].current.removeEventListener(
          'timeupdate',
          handleNextTrailer
        )
    }
  }, [
    currentVideoIndex,
    videoRefs,
    currentPlaylistIndex,
    currentTrailerIndex,
  ])

  // Effect hook for handling the crossfade transition between trailers
  useEffect(() => {
    const nextVideoIndex = currentVideoIndex === 0 ? 1 : 0 // Determine the next video index for the transition
    if (crossfade && videoRefs[nextVideoIndex].current) {
      // If crossfade is triggered and the next video element is available
      videoRefs[nextVideoIndex].current.src = 
        playlists[currentPlaylistIndex].titles[currentTrailerIndex]
          .trailer_url
       // Set the source of the next video
      videoRefs[nextVideoIndex].current.play() // Play the next video

      setCurrentVideoIndex(nextVideoIndex) // Update the current video index to the next one
      setCrossfade(false) // Reset crossfade state

      // Handler for when the current video ends
      const onEndedHandler = () => {
        videoRefs[currentVideoIndex].current.pause()
        videoRefs[currentVideoIndex].current.currentTime = 0
        videoRefs[currentVideoIndex].current.removeEventListener(
          'ended',
          onEndedHandler
        )
      }
      videoRefs[currentVideoIndex].current.addEventListener(
        'ended',
        onEndedHandler
      )
    }
  }, [
    crossfade,
    currentPlaylistIndex,
    currentTrailerIndex,
    currentVideoIndex,
    videoRefs,
  ])

  // Handler for navigating to the previous trailer or playlist
  const handlePrev = () => {
    if (currentTrailerIndex === 0) {
      // If it's the beginning of a playlist, move to the previous playlist
      const prevPlaylistIndex =
        currentPlaylistIndex === 0
          ? playlists.length - 1
          : currentPlaylistIndex - 1
      setCurrentPlaylistIndex(prevPlaylistIndex)
      setCurrentVideoIndex(0)
      setCrossfade(true)
    } else {
      // Move to the previous trailer in the current playlist
      setCurrentTrailerIndex((prevIndex) => prevIndex - 1)
      setCrossfade(true)
    }
  }

  // Handler for navigating to the next trailer or playlist
  const handleNext = () => {
    if (
      currentTrailerIndex ===
      playlists[currentPlaylistIndex].titles.length - 1
    ) {
      // If it's the end of the current playlist, move to the next playlist or reset
      const nextPlaylistIndex =
        currentPlaylistIndex === playlists.length - 1
          ? 0
          : currentPlaylistIndex + 1
      setCurrentPlaylistIndex(nextPlaylistIndex)
      setCurrentTrailerIndex(0)
      setCurrentVideoIndex(0)
      setCrossfade(true)
    } else {
      // Move to the next trailer in the current playlist
      setCurrentTrailerIndex((prevIndex) => prevIndex + 1)
      setCrossfade(true)
    }
  }

  // // Handler for changing the current playlist
  // const handlePlaylistChange = (index) => {
  //   if (currentTrailerIndex !== -1 && index !== currentPlaylistIndex) {
  //     // If there's an ongoing video, stop it before changing the playlist
  //     videoRefs[currentVideoIndex].current.pause()
  //     videoRefs[currentVideoIndex].current.currentTime = 0
  //   }

  //   setCurrentPlaylistIndex(index)
  //   setCurrentTrailerIndex(-1)
  //   setCurrentVideoIndex(0)
  //   setCrossfade(true)
  // }



  // Render method
  return (
    <div
      className='video-player'
      ref={peekviewRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        {videoRefs.map((ref, index) => (
          <div
            key={index}
            className={`video-container ${
              currentVideoIndex === index ? 'visible' : 'hidden'
            }`}
            style={{
              transition: `opacity 1s ease, z-index 0.5s ease`, // Apply transition effect
            }}
          >
            <video
              ref={ref}
              className='video'
              autoPlay
              controls
              muted
            >
              <source
                src={
                  playlists[currentPlaylistIndex].titles[currentTrailerIndex]
                    .trailer_url
                }
              />
              Your browser does not support the video tag.
            </video>
            <div className={isMouseOver ? 'text-overlay' : 'hidden'}>
              <b>
                {
                  playlists[currentPlaylistIndex].titles[currentTrailerIndex]
                    .title
                }
              </b>
              <p>
                {
                  playlists[currentPlaylistIndex].titles[currentTrailerIndex]
                    .year
                }
              </p>
              <p>
                {Array.isArray(
                  playlists[currentPlaylistIndex].titles[currentTrailerIndex]
                    .genres
                ) &&
                playlists[currentPlaylistIndex].titles[currentTrailerIndex]
                  .genres.length > 0
                  ? '[' +
                    playlists[currentPlaylistIndex].titles[
                      currentTrailerIndex
                    ].genres.join(', ') +
                    ']'
                  : ''}
              </p>
              <p>
                {
                  playlists[currentPlaylistIndex].titles[currentTrailerIndex]
                    .description
                }
              </p>
            </div>
          </div>
        ))
      }
      <div className={isMouseOver ? 'controls' : 'hidden'}>
        {/* Buttons to navigate between trailers */}
        <button onClick={handlePrev}>&#8249;</button>
        <button onClick={handleNext}>&#8250;</button>
      </div>
    </div>
  )
}

export default VideoPlayer // Exporting the component for use in other parts of the application
