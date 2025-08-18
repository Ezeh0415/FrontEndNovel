import { useState } from "react";

export default function useNovelForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genres: "", // comma separated
    pages: "",
    rating: "",
    imageUrl: "",
    novelUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      image_url: formData.imageUrl,
      novel_pages_url: formData.novelUrl,
    };

    console.log("Submitted Novel Data:", novelData);
    alert("Submitted! Check console.");
  };

  return {
    step,
    formData,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit,
  };
}
