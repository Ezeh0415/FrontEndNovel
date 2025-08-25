import { useMyContext } from "../../Controller/DashbordContr/GetAllFile";

export default function Profile() {
  const {model,setModel,Logout} = useMyContext();
  const userProfile = localStorage.getItem("user");
  const user = JSON.parse(userProfile);
  
  

  return (
    <div className="max-w-4xl p-6 mx-auto space-y-6 text-white rounded-lg shadow-md relative">
      {/* User Info Header */}
      <div className="flex items-center space-x-4">
        <div className={model ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" : "hidden fixed inset-0 z-50  items-center justify-center bg-black bg-opacity-50"}>
          <div className="w-[90%] max-w-md bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded hover:bg-gray-600 transition"
                onClick={() => setModel(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
                onClick={Logout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          className="object-cover w-20 h-20 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-semibold capitalize">
            {user.firstName} {user.lastName}
          </h2>
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
          <h1 className="p-2 text-black capitalize bg-yellow-300 rounded-lg w-fit"
           onClick={() => setModel(true)}
          >
            logout
          </h1>
          <div className="mt-3">
            <h2 className="text-red-500 capitalize">
              you are about delete your account{" "}
            </h2>
            <h1 className="p-2 mt-2 text-red-200 capitalize bg-red-800 rounded-lg">
              delete account
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
