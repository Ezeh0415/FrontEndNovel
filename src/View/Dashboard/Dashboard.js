import Footer from "../Header/Footer";
import "./Dashbord.css";
import { Link, NavLink } from "react-router-dom";
import { useMyContext } from "../../Controller/DashbordContr/GetAllFile";
import LazyImage from "../../utils/LazyImage";

const Dashboard = () => {
  const {
    Novel,
    loading,
    error,
    handdleGetSingleNovel,
    liked,
    LikedLoading,
    LikedError,
    handleDeleteLike,
  } = useMyContext();
  console.log(liked);

  return (
    <div>
      <div className="mb-[2rem] md:mb-0">
        <section className="lg:flex lg:items-center lg:justify-between">
          <div className="flex flex-col capitalize text-[40px] overflow-hidden mb-[8rem]">
            <div className="flex items-center gap-2 sm:animation-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>

              <h1 className="tracking-widest">make your</h1>
            </div>
            <div className="flex items-center gap-2 ml-7 sm:animation-2 top-[9%] md:top-[6%]">
              <h1 className="tracking-widest mt-[-13px] ">e-bookshelf!</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="text-yellow-400 size-6 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center capitalize text-[20px] justify-around  rounded-xl mt-[-100px] md:mt-[-100px] md:justify-end md:gap-5 lg:mr-[25px]">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "py-2 border-2 px-14 rounded-xl bg-white text-[#000]"
                  : "py-2 border-2 px-14 rounded-xl"
              }
            >
              books
            </NavLink>
            <NavLink
              to="/audio"
              none
              className={({ isActive }) =>
                isActive
                  ? "py-2 border-2 px-14 rounded-xl bg-white text-[#000]"
                  : "py-2 border-2 px-14 rounded-xl"
              }
            >
              audio
            </NavLink>
          </div>
        </section>

        {/* <section>
          {novels ? (
            <div className="hidden">empty</div>
          ) : (
            <div className="mt-8 lg:mt-[-60px] ">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold tracking-widest capitalize md:text-xl">
                  last open
                </h1>
                <Link className="mr-3 capitalize" to="/recomended">
                  view all
                </Link>
              </div>
              {novels && novels.length > 0 ? (
                <div className="flex items-center w-full gap-8 mt-4 overflow-x-scroll scrollbar-hide">
                  {novels.slice(0, 5).map((novel) => (
                    <div
                      key={novel._id}
                      className="min-w-[180px] min-h-[220px] rounded-xl md:min-w-[210px] md:min-h-[250px]"
                    >
                      <a
                        href={novel.novel_page_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div>
                          <img
                            src={`https://example.com/images/${novel.image_id}.jpg`} // Replace with your actual image path or use Unsplash as fallback
                            alt={novel.title}
                            className="w-full h-[150px] md:h-[180px] rounded-xl border-2 object-cover"
                          />
                          <h2 className="mt-2 text-sm font-semibold text-center capitalize md:text-base">
                            {novel.title}
                          </h2>
                          <p className="text-xs text-center text-gray-500 md:text-sm">
                            {novel.genre.slice(0, 2).join(", ")}
                          </p>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mt-10 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24 h-24 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m2 0a2 2 0 100-4h-6a2 2 0 100 4m0 0a2 2 0 100 4h6a2 2 0 100-4"
                    />
                  </svg>
                  <p className="text-lg capitalize">
                    last opened novel will be displayed here
                  </p>
                </div>
              )}
            </div>
          )}
        </section> */}

        <section>
          {liked && (
            <div>
              {/* {LikedError && (
                <div>

                </div>
              )} */}
              {LikedLoading ? (
                <div className="flex items-center justify-center mt-[10%]">
                  <div className="w-fit">
                    <div className="loader"></div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 lg:mt-[-60px] ">
                  <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold tracking-widest capitalize md:text-xl">
                      liked novel
                    </h1>
                    {/* <Link className="mr-3 capitalize" to="/recomended">
                    view all
                  </Link> */}
                  </div>
                  {Array.isArray(liked) && liked.length > 0 ? (
                    <div className="flex items-center w-full gap-8 mt-4 overflow-x-scroll scrollbar-hide">
                      {liked.map((liked) => (
                        <div
                          key={liked.id}
                          className="min-w-[180px] min-h-[220px] rounded-xl md:min-w-[210px] md:min-h-[250px] border-2 p-2"
                        >
                          <Link
                            to={liked.novel_pages_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div>
                              <img
                                src={liked.image_url}
                                alt={liked.title ?? "Novel image"}
                                className="w-full h-[150px] md:h-[180px] rounded-xl object-cover"
                              />
                              <h2 className="mt-2 text-sm font-semibold text-center capitalize md:text-base">
                                {liked.title ?? "No Title"}
                              </h2>
                              <p className="text-xs text-center text-gray-500 md:text-sm">
                                {liked.genres?.slice(0, 2).join(", ") ??
                                  "No Genres"}
                              </p>
                            </div>
                          </Link>
                          <div className="mx-auto mt-4 text-red-500 w-fit">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                              onClick={() => handleDeleteLike(liked.id)}
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center mt-10 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-24 h-24 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m2 0a2 2 0 100-4h-6a2 2 0 100 4m0 0a2 2 0 100 4h6a2 2 0 100-4"
                        />
                      </svg>
                      <p className="text-lg capitalize">
                        liked novel will be displayed here
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        <section>
          <div className="mt-9 md:mt-14">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold tracking-widest capitalize md:text-xl">
                recomended
              </h1>
              <Link className="mr-3 capitalize" to="/recomended">
                view all
              </Link>
            </div>
            {loading ? (
              // Render this when loading is true
              <div className="flex items-center justify-center mt-[10%]">
                <div className="w-fit">
                  <div className="loader"></div>
                </div>
              </div>
            ) : (
              <div>
                {Novel && Novel.length > 0 ? (
                  <div className="flex items-center w-full gap-8 mt-4 overflow-x-scroll scrollbar-hide">
                    {Novel.slice(0, 6).map((singleNovel) => (
                      <div
                        key={singleNovel._id}
                        className="min-w-[180px] min-h-[220px] rounded-xl md:min-w-[210px] md:min-h-[250px]"
                      >
                        <Link
                          onClick={() => handdleGetSingleNovel(singleNovel._id)}
                          to="/NovelDetail"
                        >
                          <div>
                            <LazyImage
                              src={singleNovel.image_url}
                              alt={singleNovel.title}
                              className="w-full h-[150px] md:h-[180px] rounded-xl border-2 object-cover"
                            />
                            <h2 className="mt-2 text-sm font-semibold text-center capitalize md:text-base">
                              {singleNovel.title}
                            </h2>
                            <p className="text-xs text-center text-gray-500 md:text-sm">
                              {singleNovel.genres.slice(0, 2).join(", ")}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center mt-10 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-24 h-24 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m2 0a2 2 0 100-4h-6a2 2 0 100 4m0 0a2 2 0 100 4h6a2 2 0 100-4"
                      />
                    </svg>
                    <p className="text-lg">No novels available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
