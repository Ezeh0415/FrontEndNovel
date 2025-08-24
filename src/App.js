import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./View/Dashboard/Dashboard";
import Header from "./View/Header/Header";
import DesktopHeader from "./View/Header/DesktopHeader";
import Profile from "./View/Profile/Profile";
import AudioPlayer from "./View/Audio/Audio";
import NovelForm from "./View/CreateNovel/CreateNovel";
import Like from "./View/liked/Like";
import Search from "./View/Search/Search";
import Recomended from "./View/Dashboard/Recomended/Recomended";
import NovelDetails from "./View/NovelDetails/NovelDetails";
import OpenLoader from "./View/OpenLoader/OpenLoader";
import { useMyContext } from "./Controller/DashbordContr/GetAllFile";
import SignupPage from "./View/Auth/Signup/Signuup";
import Login from "./View/Auth/Login/Login";

function App() {
  const { handleStart, openLoader, isAuthenticated } = useMyContext();
  // const isAuthenticated = () => !!localStorage.getItem("token");
  // console.log(openLoader);

  // // A wrapper for protected routes
  // function PrivateRoute({ children }) {
  //   return isAuthenticated() ? children : <Navigate to="/login" />;
  // }
  return (
    <div >
      {/* Your Content/Components */}
      {openLoader ? (
        <div onload={handleStart()}>
          <Routes>
            <Route path="/" element={<OpenLoader />} />
          </Routes>
        </div>
      ) : (
        <div>
          {isAuthenticated() ? (
            <div>
              <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          ) : (
            <div className="text-[#fff] background relative md:grid md:grid-cols-7 md:gap-4">
              <div className="col-span-1 mx-2 mt-2">
                <DesktopHeader />
              </div>
              <div className="container z-10 mx-3 mb-[1rem] col-span-6 overflow-y-scroll md:mx-1 md:h-[99vh] w-[95%] md:w-[95%] lg:w-[99%] ">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/audio" element={<AudioPlayer />} />
                  <Route path="/pen" element={<NovelForm />} />
                  <Route path="/like" element={<Like />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/recomended" element={<Recomended />} />
                  <Route path="/NovelDetail" element={<NovelDetails />} />
                </Routes>
              </div>
              <div className="fixed w-[97%] top-[92vh] ml-[5px] backdrop-blur-xl rounded-md mx-3 sm:block md:hidden">
                <Header />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
