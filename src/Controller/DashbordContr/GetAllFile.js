import React, { createContext, useState, useContext, useEffect } from "react";
import {
  GetAllNovel,
  GetSingleNovel,
  HandleLogout,
  LikedNovel,
} from "../../Model/getdb";
import { useNavigate } from "react-router-dom";
import { handleLiked, handleReview, login, signup } from "../../Model/postdb";
import localStorage from "localStorage";

// 1. Create the context for global state
const MyContext = createContext();
const Base_Url = "https://backendnovel-production.up.railway.app/";

// 2. Create the provider component
export const MyProvider = ({ children }) => {
   const navigate = useNavigate();

  // Fetch all novels from backend
  const { Novel, loading, error } = GetAllNovel(`${Base_Url}books`);

  // State for single novel selection
  const [singleNovel, setSingleNovel] = useState(null);

  // Function to set selected novel ID
  const handdleGetSingleNovel = (id) => {
    localStorage.setItem("singleFileId", id);
    setSingleNovel(id); // Also update state directly
  };

  // On component mount, load the saved ID
  useEffect(() => {
    const storedId = localStorage.getItem("singleFileId");
    if (storedId) {
      setSingleNovel(storedId);
    }
  }, []); // run only on first render

  // Now fetch the novel when singleNovel is set
  const { SingleNovel, Singleloading, Singleerror } = GetSingleNovel(
    singleNovel ? `${Base_Url}books/${singleNovel}` : null
  );

  const [likedLoading, setLikedLoading] = useState(false);
  const [likedError, setLikedError] = useState(false);
  const [LikedMessage, setLikedMessage] = useState("");
  // liked section version
  const handleSaveLiked = async () => {
    const likedUser = localStorage.getItem("user");
    const userId = likedUser ? JSON.parse(likedUser).id : null;

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
    } = SingleNovel;

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

      if (!result) {
        setLikedError(true);
        setLikedMessage("Like result undefined/null");
        return;
      }

      if (result.ok) {
        setLikedError(false);
        setLikedMessage("novel Saving is successful");
        window.location = "/dashboard";
      } else {
        setLikedError(true);
        setLikedMessage(
          result.errorMessage || "Saving failed, please try again."
        );
      }
    } catch (error) {
      setLikedError(true);
      setLikedMessage("Saving failed, please try again.");
    } finally {
      setLikedLoading(false);
      setLikedError(false);
      setTimeout(() => setLikedMessage(""), 3000);
    }
  };

  // Loader state and function to start loader
  const [openLoader, setopenLoader] = useState(true);
  const handleStart = () => {
    setTimeout(() => {
      setopenLoader(false);
    }, 8000); // Loader stays open for 8 seconds
  };

  // Authentication and signup state
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [btnLoading, setLoading] = useState(false);
 
  // Simple email validation function
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Signup form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation
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
    setMessage(""); // Clear any previous message

    try {
      // Call signup API
      const result = await signup(firstName, lastName, password, email);

      console.log("Signup result:", result);
      if (!result) {
        console.error("Signup returned undefined!");
        return;
      }

      if (result.ok) {
        // Store token and user profile on successful signup
        const token = result.data.accessToken;
        const User = result.data.user;

        if (User) {
          localStorage.setItem("user", JSON.stringify(User)); // ✅ stringify the object
        }

        if (token) {
          localStorage.setItem("jwtToken", token); // ✅ this is already a string
        }

        setMessage("Signup successful!");
        setfirstName("");
        setlastName("");
        setEmail("");
        setPassword("");

        // Navigate to dashboard after short delay
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        // Show error message from backend
        setMessage(result.errorMessage || "Signup failed. Please try again.");
      }
    } catch (err) {
      setMessage("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Check if user is authenticated (token exists)
  const isAuthenticated = () => {
    return localStorage.getItem("jwtToken") ? true : false;
  };

  // Login function
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
      // Call login API
      const result = await login(password, email);

      console.log("Login result:", result);
      if (!result) {
        console.error("Login returned undefined!");
        return;
      }

      if (result.ok) {
        // Store token and user profile on successful login
        const token = result.data.accessToken;
        const User = result.data.user;

        if (User) {
          localStorage.setItem("user", JSON.stringify(User)); // ✅ stringify the object
        }

        if (token) {
          localStorage.setItem("jwtToken", token); // ✅ this is already a string
        }

        setMessage("Login successful!");
        setEmail("");
        setPassword("");

        // Navigate to dashboard after short delay
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        // Show error message from backend
        setMessage(result.errorMessage || "Login failed. Please try again.");
      }
    } catch (err) {
      setMessage("Unexpected error. Please try again.");
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Logout function
  const [model, setModel] = useState(false);
  const Logout = async () => {
    console.log("Logout started");

    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
      setModel(false);
      await HandleLogout(`${Base_Url}logout`);

      console.log("Logout successful, redirecting...");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Liked section
  const likedUser = localStorage.getItem("user");
    const userId = likedUser ? JSON.parse(likedUser).id : null;
  const { liked, LikedLoading, LikedError } = LikedNovel(
    `${Base_Url}novelLiked/${userId}`
  );

  // Review section
  const [review, setReview] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const Users = localStorage.getItem("user");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const usersLastName = JSON.parse(Users).lastName;
    if (!review || !usersLastName) {
      setReviewError(true);
      setReviewMessage("All fields are required.");
      return;
    }

    setReviewLoading(true);
    setReviewMessage("");

    try {
      const result = await handleReview(review, usersLastName, singleNovel);
      console.log("Review result:", result);

      if (!result) {
        console.error("Review returned undefined!");
        return;
      }

      if (result.ok) {
        setReviewMessage("Review submitted successfully!");
        setReview("");
        navigate(0);
      }
    } catch (error) {
      setReviewError(error.errorMessage);
    } finally {
      setReviewLoading(false);
    }
  };

  // Provide all state and functions to children via context
  return (
    <MyContext.Provider
      value={{
        Novel,
        loading,
        error,
        SingleNovel,
        Singleloading,
        handdleGetSingleNovel,
        handleStart,
        openLoader,
        isAuthenticated,
        firstName,
        lastName,
        email,
        password,
        message,
        handleSubmit,
        setfirstName,
        setlastName,
        setEmail,
        setPassword,
        btnLoading,
        handleLogin,
        model,
        setModel,
        Logout,
        review,
        reviewLoading,
        reviewError,
        reviewMessage,
        setReview,
        handleSubmitReview,
        handleSaveLiked,
        LikedMessage,
        likedError,
        likedLoading,
        liked,
        LikedLoading,
        LikedError,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// 3. Custom hook to use context easily
export const useMyContext = () => useContext(MyContext);
