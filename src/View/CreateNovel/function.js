import { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const novelData = {
      title: formData.title,
      author: formData.author,
      genres: formData.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      pages: parseInt(formData.pages, 10),
      rating: parseFloat(formData.rating),
      image_url: formData.imageUrl, // base64 image string
      novel_pages_url: formData.novelUrl,
    };

    console.log("Submitted Novel Data:", novelData);
    alert("Submitted! Check console.");
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
