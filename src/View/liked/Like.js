import React from "react";
import { useMyContext } from "../../Controller/DashbordContr/GetAllFile";

const Like = () => {
  const { liked, LikedLoading, LikedError, handleDeleteLike } = useMyContext();

  return (
    <section className="max-w-5xl px-4 mx-auto mb-12 h-[77vh] overflow-y-auto">
      <h2 className="pb-2 mb-8 text-3xl font-semibold text-gray-200 capitalize border-b border-gray-300">
        Favourite Novels
      </h2>

      <div className="p-6 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-xl">
        {LikedError && (
          <p className="font-medium text-center text-red-600">{LikedError}</p>
        )}

        {LikedLoading && (
          <div className="flex justify-center my-8">
            <div className="loader"></div>
          </div>
        )}

        {!LikedLoading && liked.length === 0 && (
          <p className="italic text-center text-gray-200">No favourite novels</p>
        )}

        <div className="space-y-8">
          {liked.map((like) => (
            <article
              key={like.id}
              className="flex flex-col overflow-hidden transition-shadow duration-300 rounded-lg shadow-sm md:flex-row bg-gray-50 hover:shadow-lg"
            >
              {/* Image */}
              <img
                src={like.image_url}
                alt={like.title}
                className="object-cover object-center w-full md:w-48"
              />

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 p-6">
                <div>
                  <h3 className="mb-1 text-2xl font-semibold text-gray-900">
                    {like.title}
                  </h3>
                  <p className="mb-3 text-sm italic text-gray-600">By {like.author}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {like.genres.map((genre) => (
                      <span
                        key={genre}
                        className="inline-block px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-6 text-gray-700">
                    <p className="flex items-center space-x-1 text-sm font-semibold">
                      <span role="img" aria-label="star" className="text-yellow-500">
                        ⭐
                      </span>
                      <span>{like.rating}/10</span>
                    </p>
                    <p className="text-sm">{like.pages} pages</p>
                  </div>
                </div>

                <div className="flex items-center mt-6 space-x-4">
                  <a
                    href={like.novel_pages_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Read Now
                  </a>

                  <button
                    onClick={() => handleDeleteLike(like.id)}
                    aria-label="Remove from favourites"
                    className="text-red-600 transition-colors duration-200 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Like;
