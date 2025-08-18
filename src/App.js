import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./View/Dashboard/Dashboard";
import Header from "./View/Header/Header";
import DesktopHeader from "./View/Header/DesktopHeader";
import Profile from "./View/Profile/Profile";
import AudioPlayer from "./View/Audio/Audio";
import NovelForm from "./View/CreateNovel/CreateNovel";
import Like from "./View/liked/Like";
import Search from "./View/Search/Search";

function App() {
  return (
    <div className="text-[#fff] background relative md:grid md:grid-cols-7 md:gap-4">
      {/* Your Content/Components */}
      <div className="col-span-1">
        <DesktopHeader />
      </div>
      <div className="z-10 mx-3 mb-[1rem] col-span-6 ">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/audio" element={<AudioPlayer />} />
          <Route path="/pen" element={<NovelForm />} />
          <Route path="/like" element={<Like />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
        <div className="fixed w-[97%] top-[92vh] ml-[5px] backdrop-blur-xl rounded-md mx-3 sm:block md:hidden">
          <Header />
        </div>
    </div>
  );
}

export default App;
