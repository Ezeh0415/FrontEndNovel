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
  console.log(results);

  return (
    <div>
      <div className="min-h-screen p-6">
        <div>
          {/* Search Bar */}
          <form className="flex mb-8" onSubmit={handleSearchTitle}>
            <input
              type="text"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              required
              placeholder="Search for novels, authors, title"
              className="flex-grow px-4 py-3 text-black border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-3 text-white transition bg-yellow-500 rounded-r-md hover:bg-yellow-700"
            >
              Search
            </button>
          </form>

          {/* Search Results */}
          {SearchLoading && <p>Loading...</p>}
          {/* {SearchError && (
            <div className="mx-auto w-fit">
              <p>{SearchError}</p>
            </div>
          )} */}

          <div className="space-y-6 lg:grid lg:grid-cols-2">
            {/* Example result card */}
            {SearchError ? (
              <div>
                <div className="mx-auto text-white w-fit">
                  <p>{SearchMessage}</p>
                </div>
              </div>
            ) : (
              <div>
                {!results || results.length === 0 ? (
                  <div>
                    <h1 className="text-white">input query to search</h1>
                  </div>
                ) : (
                  results.map((novel) => (
                    <div
                      key={novel._id}
                      className="overflow-hidden rounded-lg shadow-md md:flex md:items-center md:gap-8"
                    >
                      <img
                        className="object-cover w-full h-32 md:w-56 md:h-48"
                        src={
                          novel.image_url 
                        }
                        alt={`${novel.title} Cover`}
                      />
                      <div className="flex flex-col justify-between p-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-100">
                            {novel.title}
                          </h3>
                          <p className="text-sm italic text-gray-200">
                            by {novel.author}
                          </p>
                          <div className="flex items-center gap-3 capitalize">
                            {novel.genres.map((gen) => {
                              return (
                                <div className="flex items-center gap-3">
                                  <p>{gen}</p>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex items-center gap-4 capitalize">
                            <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                              pages : {novel.pages}
                            </p>
                            <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                              Rating : {novel.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handdleGetSingleNovel(novel._id)}
                        className="px-3 py-1 mt-4 text-white transition bg-yellow-600 rounded hover:bg-yellow-700 w-max"
                      >
                        View Details
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
