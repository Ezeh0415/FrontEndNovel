const Footer = () => {
  return (
    <div>
      <footer className="py-8 mt-20 sm:mb-[6rem] md:mb-0 text-gray-300 w-[98%] mx-auto max-w-7xl">
        <div className="container flex flex-col px-6 mx-auto md:flex-row md:items-start md:space-x-10">
          {/* Logo & Description */}
          <div className="mb-8 text-center md:mb-0 md:w-1/3 md:text-left">
            <h1 className="mb-2 text-2xl font-bold tracking-wide text-yellow-500">
              NovelHub
            </h1>
            <p className="max-w-sm mx-auto text-gray-400 md:mx-0">
              Your go-to platform for fresh novels and stories. Stay updated
              with our latest releases.
            </p>
          </div>

          {/* Subscription Form */}
          <div className="mb-8 text-center md:mb-0 md:w-1/3 md:text-left">
            <h3 className="mb-3 font-semibold tracking-wider text-yellow-500 uppercase">
              Subscribe to Newsletter
            </h3>
            <form className="flex flex-col items-center max-w-md mx-auto sm:flex-row sm:items-stretch md:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow w-full h-10 px-3 text-gray-900 placeholder-gray-500 border-2 border-yellow-500 rounded-l-lg sm:w-auto focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 mt-3 font-semibold text-gray-900 transition bg-yellow-500 rounded-r-lg sm:mt-0 sm:ml-2 hover:bg-yellow-400 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="max-w-xs mx-auto mt-2 text-xs text-gray-500 md:mx-0">
              By subscribing, you agree to our{" "}
              <a href="#" className="underline hover:text-yellow-400">
                terms and conditions
              </a>
              .
            </p>
          </div>

          
        </div>

        {/* Social Media */}
        <div className="container flex justify-center px-6 mx-auto mt-8 space-x-6 text-gray-400 md:justify-end">
          <a href="#" className="hover:text-yellow-400" aria-label="Facebook">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11.5 9.87v-6.98h-2.34v-2.9h2.34v-2.21c0-2.32 1.37-3.6 3.47-3.6.99 0 2.03.18 2.03.18v2.23h-1.14c-1.13 0-1.48.7-1.48 1.41v1.99h2.51l-.4 2.9h-2.11v6.98A10 10 0 0022 12z" />
            </svg>
          </a>
          <a href="#" className="hover:text-yellow-400" aria-label="Twitter">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.03 9.03 0 01-2.83 1.08 4.52 4.52 0 00-7.72 4.13 12.84 12.84 0 01-9.31-4.72 4.49 4.49 0 001.4 6.04 4.41 4.41 0 01-2.05-.56v.06a4.51 4.51 0 003.63 4.42 4.48 4.48 0 01-2.04.08 4.53 4.53 0 004.22 3.13 9.07 9.07 0 01-5.63 1.95A8.75 8.75 0 012 19a12.75 12.75 0 006.92 2" />
            </svg>
          </a>
          <a href="#" className="hover:text-yellow-400" aria-label="Instagram">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm10 2a1 1 0 110 2 1 1 0 010-2zm-5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </a>
        </div>

        <div className="pt-6 mt-12 text-sm text-center text-gray-500 border-t border-gray-700">
          &copy; 2025 NovelHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
