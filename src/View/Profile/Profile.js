import { useEffect, useState } from "react";
import { useMyContext } from "../../Controller/DashbordContr/GetAllFile";
import useFileInput from "./ProfileFunction";

export default function Profile() {
  const {
    fileInputRef,
    handleSvgClick,
    handleFileChange,
    imageUrl,
    profileImgModel,
    onCancel,
    onConfirm,
    profileImg,
    ProfileError,
    profileMessage,
    profileStyle,
    setSelectModel,
    selectModel,
    deleteLoading,
    deleteError,
    deleteMessage,
    handleDeleteUser,
  } = useFileInput();
  const { model, setModel, Logout, likedCount, TotalReview } = useMyContext();
  const userProfile = localStorage.getItem("user");
  const user = JSON.parse(userProfile);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [logoutMessage2, setLogoutMessage2] = useState("");


  return (
    <div className="max-w-4xl p-6 mx-auto space-y-6 text-white rounded-lg shadow-md relative">
      {user && (
        <div>
          <div className="flex items-center space-x-4">
            <div
              className={
                model
                  ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                  : "hidden fixed inset-0 z-50  items-center justify-center bg-black bg-opacity-50"
              }
            >
              <div className="w-[90%] max-w-md bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-white mb-4">
                  {logoutMessage}
                </h2>
                <p className="text-gray-300 mb-6">{logoutMessage2}</p>

                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded hover:bg-gray-600 transition"
                    onClick={() => setModel(false)}
                  >
                    Cancel
                  </button>
                  {selectModel ? (
                    <button
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
                      onClick={Logout}
                    >
                      Log Out
                    </button>
                  ) : (
                    <div>
                      {deleteLoading ? (
                        <div>
                          <div class="loader"></div>
                        </div>
                      ) : (
                        <div>
                          {deleteError ? (
                            <div>
                              <p className="text-red-600 text-sm mt-1 capitalize">
                                {deleteMessage}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <button
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition capitalize"
                                onClick={handleDeleteUser}
                              >
                                delete account
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={profileImgModel ? "block" : "hidden"}>
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-[90%] max-w-md bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                  <h2 className="text-lg font-semibold text-white mb-4 capitalize text-center">
                    Confirm Profile Image Update
                  </h2>

                  {imageUrl && (
                    <div className="mb-6 flex justify-center">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="h-[60vh] rounded-md object-contain"
                      />
                    </div>
                  )}

                  <div className="flex justify-end space-x-3">
                    <button
                      className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded hover:bg-gray-600 transition"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                      onClick={onConfirm}
                    >
                      Confirm Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={ProfileError ? profileStyle : "hidden"}>
              <span className="font-medium text-sm md:text-xl lg:text-2xl">
                {" "}
                {profileMessage}{" "}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              {profileImg ? (
                <img
                  src={profileImg}
                  alt={user.firstName}
                  className=" w-20 h-20 rounded-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              )}

              <input
                type="file"
                accept="image/*"
                name="imageUrl"
                placeholder="Cover Image URL"
                ref={fileInputRef}
                onChange={handleFileChange}
                required
                className="hidden"
              />

              <svg
                onClick={handleSvgClick}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 mt-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-2xl font-semibold capitalize mt-[-30px]">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-300">Joined Jan 2024</p>
            </div>
          </div>

          {/* Library Section */}
          <section>
            <h3 className="mb-2 text-xl font-semibold">📚 Library</h3>
            <ul className="space-y-1 text-gray-300 list-disc list-inside capitalize">
              <li>Currently Reading: 0</li>
              <li>Completed: 0</li>
              {/* <li>subscribed : {Subscribe} </li> */}
            </ul>
          </section>

          {/* Interactions */}
          <section>
            <h3 className="mb-2 text-xl font-semibold">⭐ Interactions</h3>
            <ul className="space-y-1 text-gray-300 list-disc list-inside capitalize">
              <li>
                Liked Novels : <strong> {likedCount} </strong>
              </li>
              <li>
                {" "}
                {TotalReview && (
                  <div>
                    total Review Posted :{" "}
                    <strong> {TotalReview.totalReviews} </strong>
                  </div>
                )}
              </li>
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
            <div className="mb-[4rem] mt-[1rem]">
              <h1
                className="p-2 text-black capitalize bg-yellow-300 rounded-lg w-fit"
                onClick={() => {
                  setModel(true);
                  setSelectModel(true);
                  setLogoutMessage("confirm you want to logout?");
                  setLogoutMessage2("Are you sure you want to logout?");
                }}
              >
                logout
              </h1>
              <div className="mt-3">
                <h2 className="text-red-500 capitalize">
                  you are about delete your account{" "}
                </h2>
                <h1
                  className="p-2 mt-2 text-red-200 capitalize bg-red-800 rounded-lg"
                  onClick={() => {
                    setModel(true);
                    setSelectModel(false);
                    setLogoutMessage("confirm account deletion?");
                    setLogoutMessage2(
                      "Are you sure you want to delete account"
                    );
                  }}
                >
                  delete account
                </h1>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* User Info Header */}
    </div>
  );
}
