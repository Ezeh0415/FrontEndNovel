import React from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../../../Controller/DashbordContr/GetAllFile";

function SignupPage() {
  const {
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
    btnLoading
  } = useMyContext();
  return (
    <div className="flex items-center justify-center min-h-screen px-2 capitalize sm:px-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-4 bg-gray-900 border border-gray-700 shadow-2xl sm:p-8 rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">
          Create Account
        </h2>

        <div className="max-w-md px-4 py-3 mx-auto my-4 text-red-100 rounded-md shadow-md bg-opacity-80">
          <p className="text-sm font-semibold text-center md:text-base">
            {message}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-300"
            >
              FirstName
            </label>
            <input
              type="text"
              id="username"
              placeholder="Your username"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-300"
            >
              LastName
            </label>
            <input
              type="text"
              id="username"
              placeholder="Your username"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {btnLoading ? (
            <div className=" mx-auto w-fit">
              <div class="loader"></div>
            </div>
          ) : (
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                sign up
              </button>
            </div>
          )}
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
