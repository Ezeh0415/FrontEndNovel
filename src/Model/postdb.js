const Base_Url = "https://backendnovel-production.up.railway.app";
export const signup = async (username, password, email) => {
  return fetch(`${Base_Url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
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
