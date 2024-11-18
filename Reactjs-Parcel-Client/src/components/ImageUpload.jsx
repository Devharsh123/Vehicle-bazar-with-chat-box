import React, { useState, useRef } from "react";
import DefaultImage from "../assets/upload-photo-here.png";
import EditIcon from "../assets/edit.svg";
import UploadingAnimation from "../assets/uploading.gif";

const ImageUpload = ({ onImageUpload }) => {
  const [avatarURL, setAvatarURL] = useState(DefaultImage);

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async () => {
    try {
      setAvatarURL(UploadingAnimation);
      const uploadedFile = fileUploadRef.current.files[0];
      const cachedURL = URL.createObjectURL(uploadedFile);
      setAvatarURL(cachedURL);

      onImageUpload(uploadedFile);
      // }
    } catch (error) {
      console.error(error);
      setAvatarURL(DefaultImage);
    }
  };

  return (
    <div className="relative h-24 w-60 m-8">
      <img src={avatarURL} alt="Avatar" className="h-32 w-56" />

      <form id="form" encType="multipart/form-data">
        <button
          type="submit"
          onClick={handleImageUpload}
          className="flex-center absolute bottom-14 h-9 w-9 rounded-full"
        >
          <img src={EditIcon} alt="Edit" className="object-cover" />
        </button>
        <input
          type="file"
          id="file"
          ref={fileUploadRef}
          onChange={uploadImageDisplay}
          hidden
        />
      </form>
    </div>
  );
};

export default ImageUpload;
