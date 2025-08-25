import React, { createContext, useState, useContext, useEffect } from "react";
import { GetAllNovel, GetSingleNovel, HandleLogout } from "../../Model/getdb";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../Model/postdb";
import localStorage from "localStorage";

// 1. Create the context for global state
const MyContext = createContext();
const Base_Url = "https://backendnovel-production.up.railway.app/";

// 2. Create the provider component
export const MyProvider = ({ children }) => {
  // Fetch all novels from backend
  const { Novel, loading, error } = GetAllNovel(`${Base_Url}books`);

  // State for single novel selection
  const [singleNovel, setSingleNovel] = useState(null);
  // Function to set selected novel ID
  const handdleGetSingleNovel = (id) => {
    setSingleNovel(id);
  };

  // Fetch details for a single novel
  const { SingleNovel, Singleloading, Singleerror } = GetSingleNovel(
    `${Base_Url}books/${singleNovel}`
  );

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
  const [userProfile, setUserProfile] = useState("");
  const [btnLoading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        setUserProfile(result.data.user);
        if (token) {
          localStorage.setItem("jwtToken", token);
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

  // Store user profile in localStorage whenever it changes
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("user", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  // Check if user is authenticated (token exists)
  const isAuthenticated = () => {
    return localStorage.getItem("jwtToken") ? true : false;
  };

  // login function
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
      // Call signup API
      const result = await login(password, email);

      console.log("Signup result:", result);
      if (!result) {
        console.error("Signup returned undefined!");
        return;
      }

      if (result.ok) {
        // Store token and user profile on successful signup
        const token = result.data.accessToken;
        setUserProfile(result.data.user);
        if (token) {
          localStorage.setItem("jwtToken", token);
        }

        setMessage("Signup successful!");
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
      setEmail("");
      setPassword("");
      setLoading(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // logout function
  const [model, setModel] = useState(false);
  const Logout = async () => {
    console.log("Logout started");
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");

      await HandleLogout(`${Base_Url}logout`);

      console.log("Logout successful, redirecting...");
      navigate("/login"); // or use navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error);
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
        userProfile,
        handleLogin,
        model,
        setModel,
        Logout,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// 3. Custom hook to use context easily
export const useMyContext = () => useContext(MyContext);
