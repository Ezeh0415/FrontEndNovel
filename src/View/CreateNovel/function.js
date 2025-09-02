import { useState } from "react";
import { createNovel } from "../../Model/postdb";


export default function useNovelForm() {
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(null); // For image preview (optional)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genres: "", // comma separated
    pages: "",
    rating: "",
    imageUrl: "", // will be base64 string
    novelUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Special case for image input
    if (name === "imageUrl" && files && files[0]) {
      const file = files[0];

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
          setPreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    
      const title =  formData.title
      const author = formData.author
      const genres = formData.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean)
      const pages = parseInt(formData.pages, 10)
      const rating = parseFloat(formData.rating)
      const image_url = formData.imageUrl // base64 image string
      const novel_pages_url = formData.novelUrl
    
    const result = await createNovel(title, author, genres, pages, rating, image_url, novel_pages_url);

    console.log("Submitted Novel Data:", result);

    // Reset the form data and preview
    setFormData({
      title: "",
      author: "",
      genres: "", // comma separated
      pages: "",
      rating: "",
      imageUrl: "", // will be base64 string
      novelUrl: "",
    });
    setPreview(null);
    window.location = "/dashboard";
  };

  return {
    step,
    formData,
    preview,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit,
  };
}
