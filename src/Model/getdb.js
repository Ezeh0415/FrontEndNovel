import { useState, useEffect } from "react";

// Fetch all novels
export const GetAllNovel = (url) => {
  const [Novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setNovel(data.data); // Assign fetched data
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { Novel, loading, error };
};
export const GetAllNovelPag = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch novels");
  const data = await res.json();
  return data; // assume this includes { Novel: [...] }
};

// Fetch a single novel
export const GetSingleNovel = (url) => {
  const [SingleNovel, setSingleNovel] = useState(null);
  const [Singleloading, setSingleLoading] = useState(true);
  const [Singleerror, setSingleError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setSingleLoading(true);
    setSingleError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setSingleNovel(data.data); // Assign fetched data
      })
      .catch((e) => setSingleError(e.message))
      .finally(() => setSingleLoading(false));
  }, [url]);

  return { SingleNovel, Singleloading, Singleerror };
};

// Logout handler
export const HandleLogout = async (url) => {
  try {
    const res = await fetch(url, {
      method: "GET", // Correct HTTP method
    });
    if (!res.ok) throw new Error("Logout failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Logout API error:", error);
    throw error;
  }
};

// Fetch liked novels
export const LikedNovel = (url) => {
  const [liked, setLiked] = useState(null);
  const [likedCount, setLikedCount] = useState(null);
  const [LikedLoading, setLikedLoading] = useState(true);
  const [LikedError, setLikedError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLikedLoading(true);
    setLikedError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setLiked(data.data); // Assign fetched data
        setLikedCount(Array.isArray(data?.data) ? data.data.length : 0);
      })
      .catch((e) => setLikedError(e.message))
      .finally(() => setLikedLoading(false));
  }, [url]);

  return { liked, likedCount, LikedLoading, LikedError };
};
