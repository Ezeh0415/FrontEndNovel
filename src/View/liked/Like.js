import React from "react";

const Like = () => {
  return (
    <div>
      <div className="max-w-md mx-auto mt-3 overflow-hidden text-white transition-shadow duration-300 shadow-md rounded-xl hover:shadow-lg">
        <div className="md:flex">
          <img
            className="object-cover w-full h-48 md:w-48"
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80"
            alt="Novel Cover"
          />
          <div className="flex flex-col justify-between p-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-200">
                The Enchanted Forest
              </h3>
              <p className="mt-1 text-sm italic text-gray-300">
                by Jane Writer
              </p>
              <p className="mt-3 text-sm text-gray-300 line-clamp-3">
                Dive into a magical journey through an ancient forest filled
                with mystery, magic, and unforgettable characters. A thrilling
                fantasy novel that captivates from start to finish.
              </p>
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 text-white transition bg-yellow-600 rounded hover:bg-yellow-700">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Like;
