import React, { useEffect } from "react";
import { useMyContext } from "../../Controller/DashbordContr/GetAllFile";
import { Link } from "react-router-dom";

export default function NovelDetails() {
  const {
    SingleNovel,
    Singleloading,
    review,
    reviewLoading,
    reviewError,
    reviewMessage,
    setReview,
    handleSubmitReview,
    handleSaveLiked,
    LikedMessage,
    likedError,
    likedLoading,
  } = useMyContext();

  return (
    <div className="max-w-5xl px-4 py-8 mx-auto text-white capitalize">
      {/* Container */}
      <div className="p-6 space-y-6 rounded-lg shadow-md">
        {/* Header Section */}
        {Singleloading ? (
          <div className="flex items-center justify-center min-h-screen text-yellow-300 bg-gray-900">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-4 border-yellow-300 border-dashed rounded-full animate-spin"></div>
              <span className="text-xl font-semibold">Loading...</span>
            </div>
          </div>
        ) : (
          SingleNovel && (
            <div className="max-w-6xl px-4 py-8 mx-auto text-white">
              {/* Back Button */}
              <Link
                to="/recomended"
                className="flex items-center gap-2 mb-6 text-sm text-gray-300 transition hover:text-yellow-300"
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
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
                <span>Back</span>
              </Link>

              {/* Novel Info Section */}
              <div className="flex flex-col gap-8 md:flex-row">
                {/* Image */}
                <img
                  src={SingleNovel.image_url}
                  alt={SingleNovel.title}
                  className="object-cover w-full h-auto rounded-lg shadow-md md:w-48 md:h-72"
                />

                {/* Details */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <h1 className="text-4xl font-bold">{SingleNovel.title}</h1>
                  <p className="text-lg text-gray-300">
                    by {SingleNovel.author}
                  </p>
                  <p className="font-medium text-yellow-300 text-md">
                    ⭐ {SingleNovel.rating}/10
                  </p>
                  <p className="text-sm text-gray-400">
                    📄 {SingleNovel.pages} pages
                  </p>

                  {/* Genres */}
                  <div className="flex flex-wrap justify-center gap-2 mt-3 md:justify-start">
                    {SingleNovel.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-center gap-4 mt-6 sm:flex-row sm:justify-start">
                    <a
                      href={SingleNovel.novel_pages_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 text-black transition bg-yellow-300 rounded-lg hover:bg-yellow-400"
                    >
                      Read Now
                    </a>
                    <h1 className="text-center text-green-700 capitalize">
                      {LikedMessage}
                    </h1>
                    {likedLoading ? (
                      <div className="w-fit mx-auto">
                        <div class="loader"></div>
                      </div>
                    ) : (
                      <div>
                        {likedError ? (
                          <div>
                            <h2 className="text-center text-red-600">
                              {LikedMessage}
                            </h2>
                          </div>
                        ) : (
                          <div>
                            <button
                              className="p-2 text-red-500 transition rounded-full hover:bg-red-800/30"
                              onClick={handleSaveLiked}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <section className="mt-10 space-y-4">
                <h2 className="text-2xl font-semibold">💬 Reviews</h2>
                <ul className="space-y-4 text-gray-300">
                  {SingleNovel.reviews.map((review, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 bg-gray-800 border-l-4 border-yellow-400 rounded-md"
                    >
                      <p>
                        <span className="font-semibold text-white">
                          {review.reviewer}:
                        </span>{" "}
                        {review.comment}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Review Form */}
              <section className="mt-10">
                {reviewError && (
                  <p className="text-red-500 text-center">{reviewMessage}</p>
                )}

                <div className="p-6 space-y-6 bg-gray-900 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold">📝 Leave a Review</h2>

                  <form className="space-y-5" onSubmit={handleSubmitReview}>
                    <div>
                      <label
                        className="block mb-1 text-sm text-gray-300"
                        htmlFor="review"
                      >
                        Your Review
                      </label>
                      <textarea
                        id="review"
                        placeholder="Write your review..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 text-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      ></textarea>
                    </div>

                    {reviewLoading ? (
                      <div className="mx-auto w-fit">
                        <div class="loader"></div>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="submit"
                          onClick={() => console.log(SingleNovel._id)}
                          className="px-6 py-2 text-black transition bg-yellow-300 rounded-lg hover:bg-yellow-400"
                        >
                          Submit Review
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </section>
            </div>
          )
        )}
      </div>
    </div>
  );
}
