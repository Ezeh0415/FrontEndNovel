const Base_Url = "https://backendnovel-production.up.railway.app";
export const signup = async (firstName, lastName, password, email) => {
  return fetch(`${Base_Url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      // Check if response is OK (status 2xx)
      if (!response.ok) {
        // If not OK, parse error message and throw to jump to catch
        return response.json().then((errorData) => {
          // Throw an error with the message from backend or default
          throw new Error(errorData.message || "Signup failed");
        });
      }
      // If OK, parse the response body
      return response.json();
    })
    .then((data) => {
      return { ok: true, data };
      // console.log("Signup successful:", data);
    })
    .catch((error) => {
      // Handle errors here
      return { ok: false, errorMessage: error.message };
    });
};

export const login = async (password, email) => {
  return fetch(`${Base_Url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      // Check if response is OK (status 2xx)
      if (!response.ok) {
        // If not OK, parse error message and throw to jump to catch
        return response.json().then((errorData) => {
          // Throw an error with the message from backend or default
          throw new Error(errorData.message || "Signup failed");
        });
      }
      // If OK, parse the response body
      return response.json();
    })
    .then((data) => {
      return { ok: true, data };
      // console.log("Signup successful:", data);
    })
    .catch((error) => {
      // Handle errors here
      return { ok: false, errorMessage: error.message };
    });
};

export const handleReview = async (review, usersLastName, singleNovel) => {
  return fetch(`${Base_Url}/books/reviews/${singleNovel}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reviewer: usersLastName,
      comment: review,
    }),
  })
    .then((response) => {
      // Check if response is OK (status 2xx)
      if (!response.ok) {
        // If not OK, parse error message and throw to jump to catch
        return response.json().then((errorData) => {
          // Throw an error with the message from backend or default
          throw new Error(errorData.message || "Signup failed");
        });
      }
      // If OK, parse the response body
      return response.json();
    })
    .then((data) => {
      return { ok: true, data };
      // console.log("Signup successful:", data);
    })
    .catch((error) => {
      // Handle errors here
      return { ok: false, errorMessage: error.message };
    });
};

export const handleLiked = async (
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
) => {
  return fetch(`${Base_Url}/books/liked/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: _id,
      author: author,
      genres: genres,
      image_url: image_url,
      novel_pages_url: novel_pages_url,
      pages: pages,
      rating: rating,
      reviews: reviews,
      title: title,
    }),
  })
    .then((response) => {
      // Check if response is OK (status 2xx)
      if (!response.ok) {
        // If not OK, parse error message and throw to jump to catch
        return response.json().then((errorData) => {
          // Throw an error with the message from backend or default
          throw new Error(errorData.message);
        });
      }
      // If OK, parse the response body
      return response.json();
    })
    .then((data) => {
      return { ok: true, data };
      // console.log("Signup successful:", data);
    })
    .catch((error) => {
      // Handle errors here
      return { ok: false, errorMessage: error.message };
    });
};

export const handleDeleteLikes = (userId, bookId) => {
  return fetch(`${Base_Url}/books/like/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: bookId,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "Novel delete failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      return { ok: true, data };
    })
    .catch((error) => {
      return { ok: false, errorMessage: error.message };
    });
};

export const searchTitle = (Search) => {
  return fetch(`${Base_Url}/books/BookByTitle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search: Search,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "Novel delete failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      return { ok: true, data };
    })
    .catch((error) => {
      return { ok: false, errorMessage: error.message };
    });
};
export const searchAuthor = (Search) => {
  return fetch(`${Base_Url}/books/BookByAuthor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Search,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "Novel delete failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      return { ok: true, data };
    })
    .catch((error) => {
      return { ok: false, errorMessage: error.message };
    });
};

export const totalReview = (UserName) => {
  return fetch(`${Base_Url}/books/review/count`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserName,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "review count failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      return { ok: true, data };
    })
    .catch((error) => {
      return { ok: false, errorMessage: error.message };
    });
};

export const createNovel = (
  title,
  author,
  genres,
  pages,
  rating,
  image_url,
  novel_pages_url
) => {
  return fetch(`${Base_Url}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      author,
      genres,
      pages,
      rating,
      image_url,
      novel_pages_url,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "Novel delete failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      return { ok: true, data };
    })
    .catch((error) => {
      return { ok: false, errorMessage: error.message };
    });
};
