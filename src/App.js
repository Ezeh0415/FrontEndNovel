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
  const { handleStart, openLoader, isAuthenticated } = useMyContext();
  const auth = isAuthenticated();

  useEffect(() => {
    if (openLoader) {
      handleStart();
    }
  }, [openLoader]);

  // Show loader screen if loading
  if (openLoader) {
    return auth ? <Navigate to="/dashboard" replace /> : <OpenLoader />;
  }

  return (
    <div className="body">
      {/* Show desktop header only if authenticated */}

      <div
        className={`container z-10 mx-3 ml-[-2px] mb-[1rem] ${
          auth ? "md:grid md:grid-cols-12 " : "w-full"
        }`}
      >
        {auth && (
          <div className="w-full md:w-auto mt-2 md:fixed md:right-0">
            <DesktopHeader />
          </div>
        )}
        <div className="md:col-span-10 ">
          <Routes>
            {/* Public routes */}
            <Route
              path="/signup"
              element={
                auth ? <Navigate to="/dashboard" replace /> : <SignupPage />
              }
            />
            <Route
              path="/login"
              element={auth ? <Navigate to="/dashboard" replace /> : <Login />}
            />

            {/* Root route redirects based on auth */}
            <Route
              path="/"
              element={
                auth ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/signup" replace />
                )
              }
            />

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

            {/* Catch-all route for 404 or redirect */}
            <Route
              path="*"
              element={
                <Navigate to={auth ? "/dashboard" : "/signup"} replace />
              }
            />
          </Routes>
        </div>
      </div>

      {/* Mobile header, only if authenticated */}
      {auth && (
        <div className="fixed bottom-4 md:bottom-6 w-[97%] ml-[5px] backdrop-blur-xl rounded-md mx-3 sm:block md:hidden py-2">
          <Header />
        </div>
      )}
    </div>
  );
}

export default App;
