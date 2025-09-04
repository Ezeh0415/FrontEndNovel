import { useState, useRef } from "react";
import { getProfileImg, updateProfileImg } from "../../Model/postdb";

// Custom hook to handle file input logic
export default function useFileInput() {
  const [imageUrl, setImageUrl] = useState(null);
  const [profileImgModel, setProfileImgModel] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [ProfileError, setProfileError] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileStyle, setProfileStyle] = useState("");
  const fileInputRef = useRef(null);

  let email;

  const userProfile = localStorage.getItem("user");
  const user = JSON.parse(userProfile);
  email = user?.email || "";

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result); // store base64 string in state
        };
        reader.readAsDataURL(file);
        setProfileImgModel(true);
      } else {
        alert("Invalid file type. Please select an image.");
      }
    }
  };
  const onCancel = () => {
    setImageUrl(null);
    setProfileImgModel(false);
  };

  const onLoad = async () => {
    const profileResult = await getProfileImg(email);
    const image =
      profileResult?.data?.userImage || "/images/default-profile.png";
    setProfileImg(image);
  };

  if (email === "") {
    console.log("user is logged out");
  } else {
    onLoad();
  }

  const onConfirm = async () => {
    const userImage = imageUrl;

    const result = await updateProfileImg(email, userImage);
    if (result.ok) {
      setProfileError(true);
      setProfileStyle(
        "fixed bottom-5 right-5 bg-green-600 text-white px-6 py-4 rounded shadow-lg flex items-center space-x-3 z-50 animate-slide-in"
      );
      setProfileMessage("Profile image updated successfully!");
    } else {
      setProfileError(true);
      setProfileStyle(
        "fixed bottom-5 right-5 bg-red-600 text-white px-6 py-4 rounded shadow-lg flex items-center space-x-3 z-50 animate-slide-in"
      );
      setProfileMessage("Failed to update profile image. Please try again.");
    }
    setProfileImgModel(false);
  };

  setTimeout(() => {
    setProfileError(false);
  }, 4000);

  return {
    fileInputRef,
    handleSvgClick,
    handleFileChange,
    imageUrl,
    profileImgModel,
    onCancel,
    onConfirm,
    profileImg,
    ProfileError,
    profileMessage,
    profileStyle,
  };
}
