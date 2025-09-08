import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import useFileInput from "../Profile/ProfileFunction";

const DesktopHeader = () => {
  const { profileImg } = useFileInput();
  return (
    <div>
      <nav className=" w-[100%] flex items-center gap-[73vw]   md:flex-col md:w-[15vw]">
        <div className="p-2  w-fit  sm:h-[100vh] ">
          <Link to="/profile">
            {profileImg ? (
              <img
                src={profileImg}
                alt="profile img"
                className="w-[40px] h-[40px] rounded-full md:w-[80px] md:h-[80px]"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            )}
          </Link>
          <div className="hidden md:block  sm:fixed sm:top-[20rem] sm:ml-5 md:ml-[-30px] md:mt-32 lg:top-[5rem]">
            <Header />
          </div>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 md:hidden"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </div>
      </nav>
    </div>
  );
};

export default DesktopHeader;
