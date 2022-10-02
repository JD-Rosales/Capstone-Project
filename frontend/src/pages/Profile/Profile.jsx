import "./Profile.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useState } from "react";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const uploadImage = () => {
    const formData = new FormData();

    formData.append("file", selectedImage);
    formData.append("upload_preset", "l851xcg5");

    axios
      .post("https://api.cloudinary.com/v1_1/dsdlseso2/image/upload", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
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
