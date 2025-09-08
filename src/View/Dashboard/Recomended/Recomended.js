import { Link } from "react-router-dom";
import { useMyContext } from "../../../Controller/DashbordContr/GetAllFile";
import LazyImage from "../../../utils/LazyImage";
import RecomendedFunction from "./RecomendedFunction";

const Recomended = () => {
  const { handdleGetSingleNovel } = useMyContext();
  const {
    novel: Novel,
    loading,
    error,
    setPage,
    totalPages,
    pageError,
  } = RecomendedFunction();
  // console.log(Novel, totalPages, pageError);

  return (
    <div className="mx-[1rem]">
      {/* Header */}
      <div className="flex items-center justify-between mt-4 mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight">All Novel</h2>
        <Link to="/search" className="hover:scale-110 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </Link>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex items-center justify-center mt-24">
          <div className="loader"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center justify-center mt-10 text-red-500">
          {error}
        </div>
      )}

      {/* Novels Masonry Grid */}
      <div className="mb-[5rem]  h-[79vh] overflow-y-auto md:h-[93vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-2 mb-8 h-[80vh] overflow-y-auto  rounded-2xl p-4 bg-opacity-90">
          {Novel &&
            Novel.map((singleNovel) => (
              <div
                key={singleNovel._id}
                className="flex flex-col bg-[#181818] border-2 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden"
              >
                <Link
                  onClick={() => handdleGetSingleNovel(singleNovel._id)}
                  to="/NovelDetail"
                  className="flex flex-col h-full"
                >
                  <div className="w-full h-[180px] md:h-[210px] overflow-hidden flex items-center justify-center bg-[#232323]">
                    <LazyImage
                      src={singleNovel.image_url}
                      alt={singleNovel.title}
                      className="object-cover w-full h-full rounded-t-2xl"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-3">
                    <h2 className="text-base md:text-lg font-bold text-center capitalize truncate">
                      {singleNovel.title}
                    </h2>
                    <p className="text-xs md:text-sm text-center text-gray-400 mt-1 truncate">
                      {singleNovel.genres.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 rounded-lg border-2 border-gray-600 bg-[#181818] text-white font-semibold hover:bg-[#232323] transition"
          >
            Prev Page
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded-lg border-2 border-gray-600 bg-[#181818] text-white font-semibold hover:bg-[#232323] transition"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recomended;
