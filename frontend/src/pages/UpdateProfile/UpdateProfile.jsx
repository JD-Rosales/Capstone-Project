import "./UpdateProfile.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { reset, updateProfile } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";

const textfieldStyle = {
  mt: 2,
  backgroundColor: "#182240",
  color: "#F0F0F0",
  "& .MuiFormLabel-root": {
    //textfield label
    color: "#42C9A3",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    //textfield label on focused
    color: "#42C9A3",
  },
  "& .MuiOutlinedInput-root": {
    //textfield boder
    "& > fieldset": { borderColor: "#42C9A3" },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    //textfield boder color on focused
    "& > fieldset": { borderColor: "#42C9A3" },
  },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {
      borderColor: "#F0F0F0",
    },
  },
};

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const inputFile = useRef(null);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [toastLoading, setToastLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!selectedImage || selectedImage === "") {
      toast.error("Choose an image");
    } else {
      const formData = new FormData();

      formData.append("file", selectedImage);
      formData.append("upload_preset", "l851xcg5");

      const uploadToast = toast.loading("Uploading Image");
      setToastLoading(true);

      axios
        .post(
          "https://api.cloudinary.com/v1_1/dsdlseso2/image/upload",
          formData
        )
        .then((response) => {
          toast.update(uploadToast, {
            render: "Image Uploaded",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });

          const userData = {
            lastName,
            firstName,
            middleInitial,
            school,
            email,
            prevPassword: prevPassword,
            newPassword,
            image: response.data.url,
          };

          dispatch(updateProfile(userData));
        })
        .catch((error) => {
          toast.update(uploadToast, {
            render: error,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          setToastLoading(false);
        });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile Update Successfully");
      setToastLoading(false);
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isError, isSuccess, message]);

  const chooseFile = () => {
    inputFile.current.click();
  };

  const previewImage = (e) => {
    setSelectedImage(e.target.files[0]);

    // check if there is a selected file image
    if (e.target.files[0]) {
      // Save the fileURL
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setSelectedImageUrl(fileUrl);
    }
  };

  return (
    <div className="update-profile">
      <Sidebar />

      <main>
        <h1>
          EDIT <span>PROFILE</span>
        </h1>

        <form>
          <FormControl fullWidth={true}>
            <Grid2 container spacing={1}>
              <Grid2 xs={5}>
                <TextField
                  label="Last Name"
                  type="text"
                  name="lastName"
                  autoComplete="off"
                  fullWidth
                  sx={textfieldStyle}
                  InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid2>

              <Grid2 xs={5}>
                <TextField
                  label="First Name"
                  type="text"
                  name="firstName"
                  autoComplete="off"
                  fullWidth
                  sx={textfieldStyle}
                  InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid2>

              <Grid2 xs={2}>
                <TextField
                  label="M.I."
                  type="text"
                  name="middleInitial"
                  fullWidth
                  autoComplete="off"
                  sx={textfieldStyle}
                  inputProps={{ maxLength: 1 }} //Set the input max length to 1
                  InputProps={{
                    sx: { height: 50, color: "#F0F0F0" },
                  }}
                  value={middleInitial}
                  onChange={(e) => {
                    setMiddleInitial(e.target.value.toUpperCase());
                  }}
                />
              </Grid2>

              <Grid2 xs={12}>
                <TextField
                  label="School/University"
                  type="text"
                  name="school"
                  fullWidth
                  autoComplete="off"
                  sx={textfieldStyle}
                  InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                  value={school}
                  onChange={(e) => {
                    setSchool(e.target.value);
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={1} sx={{ mt: 4 }}>
              <Grid2 xs={12}>
                <TextField
                  label="Email"
                  type="text"
                  name="email"
                  autoComplete="off"
                  fullWidth
                  sx={textfieldStyle}
                  InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid2>

              <Grid2 xs={12}>
                <TextField
                  label="Current Password"
                  type="text"
                  name="password"
                  autoComplete="off"
                  fullWidth
                  sx={textfieldStyle}
                  InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                  value={prevPassword}
                  onChange={(e) => {
                    setPrevPassword(e.target.value);
                  }}
                />
              </Grid2>

              <Grid2 xs={12}>
                <TextField
                  label="New Password"
                  type="text"
                  name="password2"
                  fullWidth
                  autoComplete="off"
                  sx={textfieldStyle}
                  InputProps={{ sx: { height: 50, color: "#F0F0F0" } }}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </Grid2>
            </Grid2>

            {/* <Button
              type="submit"
              variant="contained"
              onClick={submit}
              disabled={toastLoading}
              sx={{
                background: "#42C9A3",
                color: "#F0F0F0",
                height: 40,
                mt: 4,
                width: "200px",
                borderRadius: "5px",
                fontSize: "15px",
              }}
            >
              Update
            </Button> */}

            <LoadingButton
              onClick={submit}
              loading={toastLoading}
              loadingPosition="start"
              variant="contained"
              sx={{
                background: "#42C9A3",
                color: "#F0F0F0",
                height: 40,
                mt: 4,
                width: "200px",
                borderRadius: "5px",
                fontSize: "15px",
                "& .MuiLoadingButton-loadingIndicator": {
                  //Loading indicator
                  marginLeft: "1.5em",
                },
              }}
            >
              {isLoading ? "Updating" : "Update"}
            </LoadingButton>
          </FormControl>

          <div className="profile-information">
            <div>
              <div className="img-container">
                {!selectedImage ? (
                  <div
                    className="image"
                    style={{ backgroundImage: `url(${user.userInfo.image})` }}
                  ></div>
                ) : (
                  <div
                    className="image"
                    style={{ backgroundImage: `url(${selectedImageUrl})` }}
                  ></div>
                )}
              </div>

              <span onClick={chooseFile} className="select-image">
                Change Profile Picture
              </span>
              <input
                type="file"
                ref={inputFile}
                style={{ display: "none" }}
                accept="image/x-png,image/gif,image/jpeg"
                onChange={previewImage}
              />

              <h2>
                PERSONAL <span>INFORMATION</span>
              </h2>

              <div className="information-container">
                <span>
                  Role:{" "}
                  <span>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </span>

                <span>
                  Last Name: <span>{user.userInfo.lastName}</span>
                </span>

                <span>
                  First Name: <span>{user.userInfo.firstName}</span>
                </span>

                <span>
                  Middle Initial: <span>{user.userInfo.middleInitial}</span>
                </span>

                <span style={{ marginTop: "15px" }}>
                  School: <span>{user.userInfo.school}</span>
                </span>

                <span>
                  Email: <span>{user.email}</span>
                </span>
              </div>
            </div>
          </div>
        </form>
      </main>

      {isLoading ? <Spinner /> : ""}
    </div>
  );
};

export default UpdateProfile;
