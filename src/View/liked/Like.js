import React from "react";
import { useMyContext } from "../../Controller/DashbordContr/GetAllFile";

const Like = () => {
  const { liked, LikedLoading, LikedError, handleDeleteLike } = useMyContext();
  return (
    <div>
      <h2 className=" mt-[1rem] mb-[1rem] capitalize text-2xl">
        favourite novels
      </h2>
      <div className="mt-3 overflow-hidden text-white transition-shadow duration-300 shadow-md mb-[2rem] rounded-xl hover:shadow-lg lg:grid lg:grid-cols-2 capitalize">
        <div>
          {LikedError && (
            <p className="text-center text-red-500">{LikedError}</p>
          )}
          {LikedLoading && (
            <div className="mx-auto w-fit">
              <div class="loader"></div>
            </div>
          )}

          {liked.length === 0 && (
            <p className="text-center text-gray-400">No favourite novels</p>
          )}
          {liked &&
            liked.map((like) => {
              return (
                <div className="md:flex">
                  <img
                    className="w-full h-48 md:w-48 rounded-xl"
                    src={like.image_url}
                    alt={like.title}
                  />
                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-200">
                        {like.title}
                      </h3>
                      <div>
                        <p className="mt-1 text-sm italic text-gray-300">
                          by : {like.author}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3 md:justify-start">
                          genre :{" "}
                          {like.genres.map((genre) => (
                            <span
                              key={genre}
                              className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full "
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <p className="font-medium text-yellow-300 text-md ">
                          ⭐ {like.rating}/10
                        </p>
                        <p className="text-sm text-gray-400">
                          📄 {like.pages} pages
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <button className="px-2 text-white transition bg-yellow-600 rounded random-md hover:bg-yellow-700">
                        <a
                          href={like.novel_pages_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-2 text-black transition "
                        >
                          Read Now
                        </a>
                      </button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-red-500"
                        onClick={() => handleDeleteLike(like.id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Like;
