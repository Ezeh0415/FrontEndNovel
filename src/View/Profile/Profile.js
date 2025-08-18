import React from "react";

export default function Profile() {
  return (
    <div className="max-w-4xl p-6 mx-auto space-y-6 text-white rounded-lg shadow-md">
      {/* User Info Header */}
      <div className="flex items-center space-x-4">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          className="object-cover w-20 h-20 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-semibold">ReaderUsername</h2>
          <p className="text-gray-300">Joined Jan 2024 · Level 0</p>
        </div>
      </div>

      {/* Library Section */}
      <section>
        <h3 className="mb-2 text-xl font-semibold">📚 Library</h3>
        <ul className="space-y-1 text-gray-300 list-disc list-inside">
          <li>Currently Reading: 0</li>
          <li>Completed: 0</li>
          <li>Bookmarks: 0</li>
          <li>Reading History: Active since 2022</li>
        </ul>
      </section>

      {/* Interactions */}
      <section>
        <h3 className="mb-2 text-xl font-semibold">⭐ Interactions</h3>
        <ul className="space-y-1 text-gray-300 list-disc list-inside">
          <li>Liked Novels: 18</li>
          <li>Review Posted: 45</li>
        </ul>
      </section>

      {/* Activity Feed */}
      {/* <section>
        <h3 className="mb-2 text-xl font-semibold">🔔 Recent Activity</h3>
        <ul className="space-y-1 text-gray-700 list-disc list-inside">
          <li>Commented on “The Mage’s Tower” 2h ago</li>
          <li>Rated “Apocalypse Queen” 4.5⭐ 1d ago</li>
          <li>Posted in “Best Villain MCs?” forum 3d ago</li>
        </ul>
      </section> */}

      {/* User Status */}
      <section>
        <h3 className="mb-2 text-xl font-semibold">🏅 Achievements</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
            Top Reviewer
          </span>
          <span className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full">
            Daily Reader
          </span>
          <span className="px-3 py-1 text-sm text-yellow-800 bg-yellow-100 rounded-full">
            100 Comments
          </span>
          <span className="px-3 py-1 text-sm text-purple-800 bg-purple-100 rounded-full">
            Loyal Fan
          </span>
        </div>
      </section>

      <section>
        <div className="mb-[4rem]">
          <h1 className="p-2 text-black capitalize bg-yellow-300 rounded-lg w-fit">logout</h1>
          <div className="mt-3">
            <h2 className="text-red-500 capitalize">you are about delete your account </h2>
            <h1 className="p-2 mt-2 text-red-200 capitalize bg-red-800 rounded-lg">delete account</h1>
          </div>
        </div>
      </section>
    </div>
  );
}
