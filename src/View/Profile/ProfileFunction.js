import { useState, useRef } from "react";
import {
  getProfileImg,
  updateProfileImg,
  UserDelete,
} from "../../Model/postdb";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

// Custom hook to handle file input logic
export default function useFileInput() {
  const [imageUrl, setImageUrl] = useState(null);
  const [profileImgModel, setProfileImgModel] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [ProfileError, setProfileError] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileStyle, setProfileStyle] = useState("");
  const [selectModel, setSelectModel] = useState(false);
  const fileInputRef = useRef(null);

  let email;
  let userId;

  const userProfile = localStorage.getItem("user");
  const user = JSON.parse(userProfile);
  email = user?.email || "";
  userId = user?.id || "";

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!file) {
    setProfileError(true);
    setProfileMessage("No file detected");
    return;
  }

  if (file.size > maxSize) {
    setProfileError(true);
    setProfileMessage("File is too large. Please select a file smaller than 10MB.");
    return;
  }

  if (!file.type.startsWith("image/")) {
    setProfileError(true);
    setProfileMessage("Invalid file type. Please select an image.");
    return;
  }

  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 3, // better than using maxSize in bytes
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result); // store base64 string in state
    };
    reader.onerror = () => {
      setProfileError(true);
      setProfileMessage("Error reading file");
    };
    reader.readAsDataURL(compressedFile);

    setProfileError(false);
    setProfileImgModel(true);
  } catch (error) {
    console.error(error);
    setProfileError(true);
    setProfileMessage("Error compressing image");
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

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    setDeleteLoading(true);
    try {
      const result = await UserDelete(userId, email); // or pass email if that's what your API expects

      if (result?.ok) {
        setDeleteError(false);
        setDeleteMessage("Account deleted successfully.");

        // Optional: Clear localStorage and redirect
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        setTimeout(() => {
          window.location.href = "/signup"; // or homepage
        }, 2000);
      } else {
        setDeleteError(true);
        setDeleteMessage(result?.errorMessage || "Failed to delete account.");
      }
    } catch (error) {
      setDeleteMessage("An error occurred while deleting the account.");
      setDeleteError(true);
    } finally {
      setTimeout(() => {
        setDeleteMessage("");
        setDeleteLoading(false);
        setDeleteError(false);
      }, 4000);
    }
  };

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
    setSelectModel,
    selectModel,
    deleteLoading,
    deleteError,
    deleteMessage,
    handleDeleteUser,
  };
}
