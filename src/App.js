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
import ProtectedRoute from "./View/Auth/Protected/ProtectedRoute";
import { useEffect } from "react";

function App() {
  const { handleStart, openLoader, isAuthenticated, userProfile } =
    useMyContext();
  const auth = isAuthenticated();

  useEffect(() => {
    if (openLoader) {
      handleStart();
    }
  }, [openLoader]);
  return (
    <div className="body">
      <div className="text-[#fff] background relative md:grid md:grid-cols-7 md:gap-4">
        {/* Show loader or routes */}
        {openLoader ? (
          <Routes>
            <Route
              path="*"
              element={auth ? <Navigate to="/dashboard" /> : <OpenLoader />}
            />
          </Routes>
        ) : (
          <>
            <div className={auth ? "col-span-1 mx-2 mt-2" : "hidden"}>
              <DesktopHeader />
            </div>

            <div className="container z-10 mx-3 mb-[1rem] col-span-6 overflow-y-scroll md:mx-1 md:h-[99vh] w-[95%] md:w-[95%] lg:w-[99%]">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route
                  path="/signup"
                  element={auth ? <Navigate to="/dashboard" /> : <SignupPage />}
                />
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute isAuthenticated={auth}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isAuthenticated={auth}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/audio"
                  element={
                    <ProtectedRoute isAuthenticated={auth}>
                      <AudioPlayer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pen"
                  element={
                    <ProtectedRoute isAuthenticated={auth}>
                      <NovelForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/like"
                  element={
                    <ProtectedRoute isAuthenticated={auth}>
                      <Like />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute isAuthenticated={auth}>
                      <Search />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recomended"
                  element={
                    <ProtectedRoute isAuthenticated={auth}>
                      <Recomended />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/NovelDetail"
                  element={
                    <ProtectedRoute isAuthenticated={auth}>
                      <NovelDetails />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>

            <div
              className={
                auth
                  ? "fixed bottom-4 md:bottom-6 w-[97%] ml-[5px] backdrop-blur-xl rounded-md mx-3 sm:block md:hidden py-2"
                  : "hidden"
              }
            >
              <Header />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
