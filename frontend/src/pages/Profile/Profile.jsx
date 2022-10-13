import "./Profile.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const uploadImage = () => {
    const formData = new FormData();

    formData.append("file", selectedImage);
    formData.append("upload_preset", "l851xcg5");

    const uploadToast = toast.loading("Uploading Image");

    axios
      .post("https://api.cloudinary.com/v1_1/dsdlseso2/image/upload", formData)
      .then((response) => {
        toast.update(uploadToast, {
          render: "Image Uploaded",
          type: "success",
          isLoading: false,
        });
        console.log(response);
      })
      .catch((error) => {
        toast.update(uploadToast, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
        });
        console.log(error);
      });
  };
  return (
    <div className="update-profile">
      <Sidebar />
      <h1>Update Profile</h1>
      <input
        type="file"
        onChange={(e) => {
          setSelectedImage(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default Profile;
