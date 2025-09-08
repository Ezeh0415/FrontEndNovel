import { useEffect, useState } from "react";
import { GetAllNovelPag } from "../../../Model/getdb";

const Base_Url = "https://backendnovel-production.up.railway.app/";

const RecomendedFunction = () => {
  // const { Novel, loading, error } = GetAllNovel(`${Base_Url}books`);
  const [userPage, setPage] = useState(1);
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageError, setPageError] = useState(false);



  useEffect(() => {
    const fetchNovels = async () => {
      setLoading(true);
      setError(null); // reset error

      try {
        const book = await GetAllNovelPag(`${Base_Url}books?page=${userPage}`);
        const {page, limit, totalItems, totalPages, data } = book;
        if (page > totalPages) {
          setPageError(true)
        } else {
          setPageError(false)
          setNovel(data);
          setTotalPages(page) // adjust based on your actual data structure
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, [userPage]);

  return { novel, loading, error, setPage,totalPages,pageError };
};

export default RecomendedFunction;
