import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import localStorage from "localStorage";

// Backend calls
import {
  GetAllNovel,
  GetSingleNovel,
  HandleLogout,
  LikedNovel,
} from "../../Model/getdb";
import {
  handleDeleteLikes,
  handleLiked,
  handleReview,
  login,
  searchAuthor,
  searchTitle,
  signup,
  totalReview,
} from "../../Model/postdb";

// Context Setup
const MyContext = createContext();
const Base_Url = "https://backendnovel-production.up.railway.app/";

// Provider Component
export const MyProvider = ({ children }) => {
  const navigate = useNavigate();
  const Users = localStorage.getItem("user");

  // ------------------------ Loader ------------------------
  const [openLoader, setOpenLoader] = useState(true);
  const handleStart = () => setTimeout(() => setOpenLoader(false), 8000);

  // ------------------------ Fetch All Novels ------------------------
  const { Novel, loading, error } = GetAllNovel(`${Base_Url}books`);

  // ------------------------ Single Novel ------------------------
  const [singleNovel, setSingleNovel] = useState(null);
  const { SingleNovel, Singleloading, Singleerror } = GetSingleNovel(
    singleNovel ? `${Base_Url}books/${singleNovel}` : null
  );

  const handdleGetSingleNovel = (id) => {
    setSingleNovel(id);
    localStorage.setItem("singleFileId", id);
    navigate("/NovelDetail");
  };
  const [TotalReview, setTotalReview] = useState(null);

  const handleRewiewCount = async () => {
    const UserName = JSON.parse(Users)?.lastName;
    const result = await totalReview(UserName);
    setTotalReview(result.data);
  };
  useEffect(() => {
    const storedId = localStorage.getItem("singleFileId");
    if (storedId) setSingleNovel(storedId);
    handleRewiewCount();
    console.log();
  }, []);

  // ------------------------ Liked Novels ------------------------
  const [likedLoading, setLikedLoading] = useState(false);
  const [likedError, setLikedError] = useState(false);
  const [LikedMessage, setLikedMessage] = useState("");

  const likedUser = localStorage.getItem("user");
  const userId = likedUser ? JSON.parse(likedUser).id : null;
  const { liked, likedCount, LikedLoading, LikedError } = LikedNovel(
    `${Base_Url}novelLiked/${userId}`
  );

  const handleSaveLiked = async () => {
    if (!userId) {
      setLikedError(true);
      setLikedMessage("User not logged in");
      return;
    }

    const {
      _id,
      genres,
      author,
      image_url,
      novel_pages_url,
      pages,
      rating,
      reviews,
      title,
    } = SingleNovel || {};

    if (
      !_id ||
      !genres ||
      !author ||
      !image_url ||
      !novel_pages_url ||
      !pages ||
      !rating ||
      !reviews ||
      !title
    ) {
      setLikedError(true);
      setLikedMessage("Something went wrong while saving");
      return;
    }

    setLikedLoading(true);
    setLikedMessage("");

    try {
      const result = await handleLiked(
        _id,
        genres,
        author,
        image_url,
        novel_pages_url,
        pages,
        rating,
        reviews,
        title,
        userId
      );

      if (!result || !result.ok) {
        setLikedError(true);
        setLikedMessage(result?.errorMessage || "Saving failed.");
        return;
      }

      setLikedError(false);
      setLikedMessage("Novel saved successfully");
      window.location = "/dashboard";
    } catch (error) {
      setLikedError(true);
      setLikedMessage("Saving failed, please try again.");
    } finally {
      setLikedLoading(false);
      setTimeout(() => setLikedMessage(""), 3000);
    }
  };

  // ------------------------ Authentication ------------------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [btnLoading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setMessage("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await signup(firstName, lastName, password, email);

      if (result?.ok) {
        const { accessToken, user } = result.data;
        localStorage.setItem("jwtToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        setMessage("Signup successful!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(result?.errorMessage || "Signup failed.");
      }
    } catch {
      setMessage("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await login(password, email);

      if (result?.ok) {
        const { accessToken, user } = result.data;
        localStorage.setItem("jwtToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        setMessage("Login successful!");
        setEmail("");
        setPassword("");

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(result?.errorMessage || "Login failed.");
      }
    } catch {
      setMessage("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const isAuthenticated = () => !!localStorage.getItem("jwtToken");

  const [model, setModel] = useState(false);
  const Logout = async () => {
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
      setModel(false);
      await HandleLogout(`${Base_Url}logout`);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ------------------------ Reviews ------------------------
  const [review, setReview] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const usersLastName = JSON.parse(Users)?.lastName;

    if (!review || !usersLastName) {
      setReviewError(true);
      setReviewMessage("All fields are required.");
      return;
    }

    setReviewLoading(true);
    setReviewMessage("");

    try {
      const result = await handleReview(review, usersLastName, singleNovel);

      if (result?.ok) {
        setReviewMessage("Review submitted successfully!");
        setReview("");
        navigate(0);
      }
    } catch (error) {
      setReviewError(true);
      setReviewMessage("Failed to submit review.");
    } finally {
      setReviewLoading(false);
    }
  };

  // ------------------------ delete like novel ------------------------

  const handleDeleteLike = async (bookId) => {
    // Get user from localStorage and parse it
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).id : null;

    if (!userId || !bookId) {
      // Optionally set an error message here
      setLikedMessage("User or Book ID missing.");
      setLikedError(true);
      return;
    }

    try {
      const result = await handleDeleteLikes(userId, bookId);

      if (result?.ok) {
        setLikedMessage("Like removed successfully.");
        setLikedError(false);
        // Optionally refresh liked novels or UI here
      } else {
        setLikedMessage(result?.errorMessage || "Failed to remove like.");
        setLikedError(true);
      }
    } catch (error) {
      setLikedMessage("Error removing like.");
      setLikedError(true);
    } finally {
      setTimeout(() => setLikedMessage(""), window.location.reload(), 3000);
    }
  };

  // ------------------------ search novel ------------------------
  const [Search, setSearch] = useState("");
  const [SearchResult, setSearchResult] = useState();
  const [SearchLoading, setSearchLoading] = useState(false);
  const [SearchError, setSearchError] = useState(true);
  const [SearchMessage, setSearchMessage] = useState("");

  // Combine searchTitle and searchAuthor results into one search
  // const search = async (query) => {
  //   try {
  //     const [titleResult, authorResult] = await Promise.all([
  //       searchTitle(Search),
  //       searchAuthor(Search)
  //     ]);

  //     const success = titleResult?.ok || authorResult?.ok;

  //     if (!success) {
  //       return {
  //         ok: false,
  //         errorMessage:
  //           titleResult?.errorMessage ||
  //           authorResult?.errorMessage ||
  //           "No results found.",
  //       };
  //     }

  //     return {
  //       ok: true,
  //       data: [
  //         ...(titleResult?.data || []),
  //         ...(authorResult?.data || [])
  //       ],
  //     };

  //   } catch (error) {
  //     console.error("Search error:", error);
  //     return {
  //       ok: false,
  //       errorMessage: "An unexpected error occurred during search.",
  //     };
  //   }
  // };

  const handleSearchTitle = async (e) => {
    e.preventDefault();

    setSearchLoading(true);

    if (!Search) {
      setSearchLoading(false);
      setSearchError(true);
      throw new Error("input is invalid please type ");
    }

    setSearchLoading(true);

    try {
      const result = await searchTitle(Search);
      if (result?.ok) {
        setSearchLoading(false);
        setSearchResult(result.data);
        setSearchError(false);
        // Optionally refresh liked novels or UI here
      } else {
        setSearchLoading(false);
        setSearchMessage(result?.errorMessage || "Failed to fetch data.");
        setSearchError(true);
      }
    } catch (error) {
      setSearchMessage("Error removing like.");
      setSearchError(true);
    } finally {
      setTimeout(() => setSearchMessage(""), 3000);
    }
  };
  // ------------------------ Context Value ------------------------
  return (
    <MyContext.Provider
      value={{
        // Data
        Novel,
        loading,
        error,
        SingleNovel,
        Singleloading,
        Singleerror,
        TotalReview,

        // Functions
        handdleGetSingleNovel,
        handleSaveLiked,
        handleSubmitReview,
        handleSubmit,
        handleLogin,
        Logout,
        handleStart,

        // Auth States
        isAuthenticated,
        firstName,
        lastName,
        email,
        password,
        setFirstName,
        setLastName,
        setEmail,
        setPassword,
        btnLoading,
        message,
        model,
        setModel,

        // Search states
        handleSearchTitle,
        Search,
        SearchResult,
        setSearch,
        SearchError,
        SearchLoading,
        SearchMessage,

        // Liked States
        liked,
        LikedLoading,
        LikedError,
        likedLoading,
        likedError,
        LikedMessage,
        likedCount,

        // delete likes
        handleDeleteLike,

        // Review States
        review,
        setReview,
        reviewLoading,
        reviewError,
        reviewMessage,

        // Loader
        openLoader,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Custom Hook
export const useMyContext = () => useContext(MyContext);
