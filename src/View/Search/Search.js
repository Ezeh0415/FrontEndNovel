import React from "react";
import { useMyContext } from "../../Controller/DashbordContr/GetAllFile";

const Search = () => {
  const {
    Search,
    setSearch,
    SearchError,
    SearchLoading,
    SearchMessage,
    handleSearchTitle,
    SearchResult,
    handdleGetSingleNovel,
  } = useMyContext();
  const { data: results } = SearchResult || {};

  return (
    <section className="max-w-6xl min-h-screen p-6 mx-auto">
      {/* Search Bar */}
      <form
        className="flex max-w-4xl mx-auto mb-10 overflow-hidden rounded-md shadow-md"
        onSubmit={handleSearchTitle}
      >
        <input
          type="text"
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
          required
          placeholder="Search for novels, authors, title"
          className="flex-grow px-5 py-3 text-gray-900 border-none focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-3 font-semibold text-white transition-colors duration-200 bg-yellow-600 hover:bg-yellow-700"
        >
          Search
        </button>
      </form>

      {/* Loading and Errors */}
      {SearchLoading && (
        <p className="my-12 text-lg font-medium text-center text-gray-600">
          Loading...
        </p>
      )}

      {SearchError && (
        <p className="my-8 font-semibold text-center text-gray-600">
          {SearchMessage || "ENTER A SEARCH QUERY TO START SEARCHING..!!"}
        </p>
      )}

      {/* Search Results */}
      {!SearchLoading && !SearchError && (
        <>
          {!results || results.length === 0 ? (
            <p className="my-12 italic text-center text-red-500">
              An error occurred during the search. Please try again later.
            </p>
          ) : (
            <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
              {results.map((novel) => (
                <article
                  key={novel._id}
                  className="flex flex-col transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
                >
                  <img
                    src={novel.image_url}
                    alt={`${novel.title} Cover`}
                    className="object-cover w-full h-48 rounded-t-lg"
                  />

                  <div className="flex flex-col flex-grow p-5">
                    <h3 className="mb-1 text-xl font-semibold text-gray-900">
                      {novel.title}
                    </h3>
                    <p className="mb-3 text-sm italic text-gray-600">
                      by {novel.author}
                    </p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {novel.genres.map((gen) => (
                        <span
                          key={gen}
                          className="px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full"
                        >
                          {gen}
                        </span>
                      ))}
                    </div>

                    {/* Pages & Rating */}
                    <div className="flex justify-between mb-5 text-sm text-gray-700">
                      <p>📄 {novel.pages} pages</p>
                      <p>⭐ {novel.rating}</p>
                    </div>

                    <button
                      onClick={() => handdleGetSingleNovel(novel._id)}
                      className="self-start px-5 py-2 mt-auto font-semibold text-white transition-colors duration-200 bg-yellow-600 rounded-md hover:bg-yellow-700"
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Search;
