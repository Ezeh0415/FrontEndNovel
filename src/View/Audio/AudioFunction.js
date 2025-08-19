import { useRef, useState, useEffect } from "react";

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

const AudioFunction = () => {
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

  return {
    playlist,
    audioRef,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    progress,
    duration,
    play,
    pause,
    next,
    prev,
    seek,
    formatTime,
  };
};

export default AudioFunction;
