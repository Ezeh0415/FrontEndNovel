import "./OpenLoader.css";

const OpenLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-[8rem] text-white">
      <h1 className="mb-6 text-5xl font-extrabold text-center md:text-6xl drop-shadow-lg">
        Welcome to <span className="text-indigo-400">NovelHub</span>
      </h1>
      <p className="max-w-xl mb-8 text-lg text-center md:text-xl opacity-80">
        Dive into a world of stories — write your own, explore fresh novels, and
        join a community of passionate readers and writers.
      </p>
      <div class="Loader"></div>
    </div>
  );
};

export default OpenLoader;
