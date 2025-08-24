import React, { createContext, useState, useContext } from "react";
import { GetAllNovel, GetSingleNovel } from "../../Model/getdb";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Model/postdb";
import localStorage from "localStorage";

// 1. Create the context
const MyContext = createContext();

// 2. Create the provider
export const MyProvider = ({ children }) => {
  // Call the hook inside the component
  const { Novel, loading, error } = GetAllNovel(
    "https://backendnovel-production.up.railway.app/books"
  );

  const [singleNovel, setSingleNovel] = useState(null);
  const handdleGetSingleNovel = (id) => {
    setSingleNovel(id);
  };

  const { SingleNovel, Singleloading, Singleerror } = GetSingleNovel(
    `https://backendnovel-production.up.railway.app/books/${singleNovel}`
  );

  // open loader page
  const [openLoader, setopenLoader] = useState(true);
  const handleStart = () => {
    setTimeout(() => {
      setopenLoader(false);
    }, 8000);
  };

 

  // |||| authenticate section ||||
  // sign up section
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [btnLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple regex for basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
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
      const result = await signup(username, password, email);

      console.log("Signup result:", result);
      if (!result) {
        console.error("Signup returned undefined!");
        return;
      }

      if (result.ok) {
        const token = result.data.accessToken;
        if (token) {
          localStorage.setItem("jwtToken", token);
        }

        setMessage("Signup successful!");
        setUsername("");
        setEmail("");
        setPassword("");

        // Navigate after short delay to show success message
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(result.errorMessage || "Signup failed. Please try again.");
        // Keep inputs so user can correct without retyping all
      }
    } catch (err) {
      setMessage("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

   const isAuthenticated = () => {
    return localStorage.getItem("jwtToken") ? false : true;
  };

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
        username,
        email,
        password,
        message,
        handleSubmit,
        setUsername,
        setEmail,
        setPassword,
        btnLoading,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// 3. Optional: Create a custom hook
export const useMyContext = () => useContext(MyContext);
