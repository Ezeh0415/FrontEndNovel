import { Link } from "react-router-dom";
import { useMyContext } from "../../../Controller/DashbordContr/GetAllFile";
import LazyImage from "../../../utils/LazyImage";

const Recomended = () => {
  const { Novel, loading, error, handdleGetSingleNovel } = useMyContext();
  return (
    <div>
      <div className="flex items-center justify-between mt-5">
        <h2>All Novel</h2>
        <div className="flex items-center gap-3">
          <Link to="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div>
        {loading && (
          <div className="flex items-center justify-center mt-[10%]">
            <div className="w-fit">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-5 mt-[2rem]">
          {Novel &&
            Novel.map((singleNovel) => {
              return (
                <div
                  key={singleNovel._id}
                  className="min-w-[160px] min-h-[220px] rounded-xl md:min-w-[210px] md:min-h-[250px]"
                >
                  <Link
                    onClick={() => handdleGetSingleNovel(singleNovel._id)}
                    to="/NovelDetail"
                  >
                    <div>
                      <LazyImage
                        src={singleNovel.image_url}
                        alt={singleNovel.title}
                        className="w-full h-[150px] md:h-[180px] rounded-xl border-2 object-cover"
                      />
                      <h2 className="mt-2 text-sm font-semibold text-center capitalize md:text-base">
                        {singleNovel.title}
                      </h2>
                      <p className="text-xs text-center text-gray-500 md:text-sm">
                        {singleNovel.genres.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Recomended;
