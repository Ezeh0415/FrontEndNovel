import React, { createContext, useState, useContext } from "react";
import { GetAllNovel,GetSingleNovel } from "../../Model/getdb";

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
  }

  const { SingleNovel, Singleloading, Singleerror } = GetSingleNovel(
    `https://backendnovel-production.up.railway.app/books/${singleNovel}`
  );


  return (
    <MyContext.Provider value={{ Novel, loading, error,SingleNovel , Singleloading ,handdleGetSingleNovel }}>
      {children}
    </MyContext.Provider>
  );
};

// 3. Optional: Create a custom hook
export const useMyContext = () => useContext(MyContext);
