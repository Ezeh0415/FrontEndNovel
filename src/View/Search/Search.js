import React from "react";

const Search = () => {
  return (
    <div>
      <div className="min-h-screen p-6">
        <div className="max-w-3xl mx-auto">
          {/* Search Bar */}
          <form className="flex mb-8" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search for novels, authors, genres..."
              className="flex-grow px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-3 text-white transition bg-yellow-500 rounded-r-md hover:bg-yellow-700"
            >
              Search
            </button>
          </form>

          {/* Search Results */}
          <div className="space-y-6">
            {/* Example result card */}
            <div className="flex overflow-hidden rounded-lg shadow-md">
              <img
                className="object-cover w-24 h-32"
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80"
                alt="Novel Cover"
              />
              <div className="flex flex-col justify-between p-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">
                    The Enchanted Forest
                  </h3>
                  <p className="text-sm italic text-gray-200">by Jane Writer</p>
                  <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                    Dive into a magical journey through an ancient forest filled
                    with mystery, magic, and unforgettable characters.
                  </p>
                </div>
                <button className="px-3 py-1 mt-4 text-white transition bg-yellow-600 rounded hover:bg-yellow-700 w-max">
                  View Details
                </button>
              </div>
            </div>

            {/* Add more cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
