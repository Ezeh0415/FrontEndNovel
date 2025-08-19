import Footer from "../Header/Footer";
import "./Dashbord.css";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
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
            to="/"
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

      <section>
        <div className="mt-8 lg:mt-[-60px]">
          <h1 className="text-lg font-bold tracking-widest capitalize md:text-xl lg:text-2xl">
            last opened
          </h1>
          <div className="mt-4">
            <div className="w-[100px] h-[100px] rounded-xl md:w-[150px] md:h-[150px]">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8fHx8fHx8fHx8fDE2NjMwNjQxNzV8ZW58MHx8MHx8fHwxNjYwMjg4MzQ1fHx8ZW58MHx8fHw%3D&w=1000&q=80"
                  alt=""
                  className="w-[100px] h-[100px] rounded-xl border-2 md:w-[150px] md:h-[150px]"
                />
                <h2 className="mt-1 text-sm text-center capitalize md:text-lg">
                  novel name
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mt-9 md:mt-14">
          <h1 className="text-lg font-bold tracking-widest capitalize md:text-xl">
            favourite
          </h1>
          <div className="mt-4">
            <div className="w-[100px] h-[100px] rounded-xl md:w-[150px] md:h-[150px]">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8fHx8fHx8fHx8fDE2NjMwNjQxNzV8ZW58MHx8MHx8fHwxNjYwMjg4MzQ1fHx8ZW58MHx8fHw%3D&w=1000&q=80"
                  alt=""
                  className="w-[100px] h-[100px] rounded-xl border-2 md:w-[150px] md:h-[150px]"
                />
                <h2 className="mt-1 text-sm text-center capitalize md:text-lg">
                  novel name
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mt-9 md:mt-14">
          <h1 className="text-lg font-bold tracking-widest capitalize md:text-xl">
            recomended
          </h1>
          <div className="mt-4">
            <div className="w-[180px] h-[150px] rounded-xl md:w-[210px] md:h-[180px]">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8fHx8fHx8fHx8fDE2NjMwNjQxNzV8ZW58MHx8MHx8fHwxNjYwMjg4MzQ1fHx8ZW58MHx8fHw%3D&w=1000&q=80"
                  alt=""
                  className="w-[100%] h-[150px] rounded-xl border-2 md:w-[210px] md:h-[180px]"
                />
                <h2 className="mt-1 text-sm text-center capitalize md:text-lg">
                  novel name
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
            <Footer />
    </div>
  );
};

export default Dashboard;
