import AudioFunction from "./AudioFunction";
export default function AudioPlayer() {
  const {
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
  } = AudioFunction();
  return (
    <div className="md:grid md:grid-cols-3">
      <div className="max-w-md p-6 mx-auto font-sans text-white rounded-lg shadow-lg md:col-span-2">
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
    </div>
  );
}
