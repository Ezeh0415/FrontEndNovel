// 1. Generic fetch hook
import { useState, useEffect } from "react";

export const GetAllNovel = (url) => {
  const [Novel, setNovel] = useState(); // store fetched novels here
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
        setNovel(data.data); // <-- assign fetched data here
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { Novel, loading, error };
};

export const GetSingleNovel = (url) => {
  const [SingleNovel, setSingleNovel] = useState();
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
        setSingleNovel(data.data); // <-- assign fetched data here
      })
      .catch((e) => setSingleError(e.message))
      .finally(() => setSingleLoading(false));
  }, [url]);

  return { SingleNovel, Singleloading, Singleerror };
};

const jsonString = `
{}`;

export const novels = JSON.parse(jsonString);
