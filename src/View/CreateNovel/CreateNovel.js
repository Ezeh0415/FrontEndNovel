import useNovelForm from "./function";
export default function MultiStepNovelForm() {
  const {
    step,
    formData,
    preview,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit,
  } = useNovelForm();

  return (
    <div className="max-w-md p-6 mx-auto mt-4 rounded shadow sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white capitalize sm:text-3xl">
          add your own novel
        </h1>
      </div>
      <form className="mt-5 text-black" onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
              Step 1: Basic Info
            </h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 mb-6 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
              Step 2: Details
            </h2>
            <input
              type="text"
              name="genres"
              placeholder="Genres (comma separated)"
              value={formData.genres}
              onChange={handleChange}
              required
              className="w-full p-3 mb-6 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <input
                type="number"
                name="pages"
                placeholder="Pages"
                value={formData.pages}
                onChange={handleChange}
                min="1"
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (0-10)"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
              Step 3: URLs
            </h2>
            <input
              type="file"
              accept="image/*"
              name="imageUrl"
              placeholder="Cover Image URL"
              onChange={handleChange}
              required
              className="w-full p-3 mb-6 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="url"
              name="novelUrl"
              placeholder="Novel Pages URL"
              value={formData.novelUrl}
              onChange={handleChange}
              required
              className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
              Step 4: Review & Submit
            </h2>
            <div className="mb-6 space-y-2 text-white">
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Author:</strong> {formData.author}
              </p>
              <p>
                <strong>Genres:</strong> {formData.genres}
              </p>
              <p>
                <strong>Pages:</strong> {formData.pages}
              </p>
              <p>
                <strong>Rating:</strong> {formData.rating}
              </p>
              <p>
                <strong>Cover Image URL:</strong>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-contain w-32 h-32 mt-2 md:w-52"
                  />
                )}
              </p>
              <p>
                <strong>Novel Pages URL:</strong> {formData.novelUrl}
              </p>
            </div>
            <button
              type="submit"
              className="w-full p-3 text-white transition bg-green-600 rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          </>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 text-black transition bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Previous
            </button>
          )}

          {step < 4 && (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 ml-auto text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
