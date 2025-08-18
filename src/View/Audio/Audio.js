import React, { useRef, useState, useEffect } from "react";

const playlist = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/id/237/200/200", // placeholder album art
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/id/238/200/200",
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/id/239/200/200",
  },
];

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => {
      next();
    });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", next);
    };
  }, [currentTrack]);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const next = () => {
    setIsPlaying(false);
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const prev = () => {
    setIsPlaying(false);
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const seek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  // Format time mm:ss
  const formatTime = (sec) => {
    if (isNaN(sec)) return "00:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  useEffect(() => {
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Play prevented:", error);
      });
    }
  } else {
    audioRef.current.pause();
  }
}, [currentTrack, isPlaying]);

  return (
    <>
      <div className="max-w-md p-6 mx-auto font-sans text-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          {/* Album Art */}
          <img
            src={playlist[currentTrack].cover}
            alt={playlist[currentTrack].title}
            className="object-cover w-48 h-48 mb-4 rounded-lg shadow-lg"
          />

          {/* Track Info */}
          <h2 className="text-2xl font-bold">{playlist[currentTrack].title}</h2>
          <p className="mb-4 text-gray-400">{playlist[currentTrack].artist}</p>

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={playlist[currentTrack].src}
            preload="metadata"
          />

          {/* Progress Bar */}
          <div className="flex items-center w-full mb-4 space-x-3">
            <span className="w-12 text-xs text-gray-400">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min="0"
              max={duration ? duration : 0}
              value={progress}
              onChange={seek}
              className="flex-grow cursor-pointer accent-green-500"
            />
            <span className="w-12 text-xs text-gray-400">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-6">
            <button
              onClick={prev}
              className="text-gray-400 transition-colors hover:text-white"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 19l-7-7 7-7M20 19l-7-7 7-7"
                />
              </svg>
            </button>

            {!isPlaying ? (
              <button
                onClick={play}
                className="p-4 text-white transition bg-green-500 rounded-full shadow-lg hover:bg-green-600"
                aria-label="Play"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 3v18l15-9L5 3z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={pause}
                className="p-4 text-white transition bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-600"
                aria-label="Pause"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>
            )}

            <button
              onClick={next}
              className="text-gray-400 transition-colors hover:text-white"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 5l7 7-7 7M6 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[1rem] mb-[4rem]">
        <h1 className="text-xl capitalize">playlist</h1>
        {playlist.map((song, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setCurrentTrack(index);
                setIsPlaying(true);
              }}
              className={`flex items-center gap-4 p-2 rounded cursor-pointer hover:text-green-200 ${
                currentTrack === index ? "text-yellow-300" : ""
              }`}
            >
              <img
                className="w-[70px] h-[70px] rounded-md border-2"
                src={song.cover}
                alt={song.title}
              />
              <div>
                <h2 className="text-lg font-bold">{song.title}</h2>
                <p className="text-sm">{song.artist}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
