import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 capitalize bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-900 border border-gray-700 shadow-2xl rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">welcome back</h2>

        <form className="space-y-5">

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          don,t have an account? <Link to="/signup" className="text-indigo-400 hover:underline">sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
