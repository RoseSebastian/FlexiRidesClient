import React, { useEffect, useState } from "react";
import { Pencil, KeyRound } from "lucide-react";
import profileIcon from "../../assets/profile-icon.png";
import Image from "react-bootstrap/Image";
import { useDispatch } from "react-redux";
import { saveAdminData } from "../../redux/feature/adminSlice";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { saveUserData } from "../../redux/feature/userSlice";
import { saveLoadingState } from "../../redux/feature/appSlice";

const Profile = ({ role = "user" }) => {
  const user = {
    role: "user",
    update_api: "/user/update",
    changePassword_api: "/user/changePassword",
  };

  if (role === "admin") {
    user.role = "admin";
    user.update_api = "/admin/update";
    user.changePassword_api = "/admin/changePassword"
  }
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    profilePic: null,
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);

  let userData = localStorage.getItem("userData");
  if (userData) {
    userData = JSON.parse(userData);
  }
  useEffect(() => {
    setFormData({
      phone: userData.phone || "",
      address: userData.address || "",
      profilePic: userData.profilePic || null,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: files ? files[0] : value,
    };
    setFormData(updatedFormData);
    const isFormValid = Object.values(updatedFormData).every((field) => {
      if (role === "admin") delete updatedFormData.address;
      return field !== "" || field == null || typeof field === File;
    });
    setIsFormValid(isFormValid);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelSave = () => {
    setFormData({
      phone: userData.phone || "",
      address: userData.address || "",
      profilePic: userData.profilePic || null,
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(saveLoadingState(true))
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const response = await axiosInstance({
        method: "PUT",
        url: user.update_api,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const loggedInUser = response.data;
      console.log("user", response);
      localStorage.removeItem("userData");
      localStorage.setItem("userData", JSON.stringify(loggedInUser));
      user.role === "user"
        ? dispatch(saveUserData(loggedInUser))
        : dispatch(saveAdminData(loggedInUser));
      setFormData({
        phone: loggedInUser.phone || "",
        address: loggedInUser.address || "",
        profilePic: loggedInUser.profilePic || null,
      });
      dispatch(saveLoadingState(false))
      toast.success("Profile updated successfully");
      setIsEditing(false);      
    } catch (error) {
      dispatch(saveLoadingState(false))
      toast.error(error.response.data.message);
    }
  };

  const handlePasswordClick = () => {
    setIsPasswordChanging(!isPasswordChanging);
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...passwordData,
      [name]: value,
    };
    setPasswordData(updatedData);
  };

  const changePassword = async(e) => {
    e.preventDefault();
    dispatch(saveLoadingState(true))
    try{
      const response = await axiosInstance({
        method: "PUT",
        url: user.changePassword_api,
        data: passwordData,
      });
      
      dispatch(saveLoadingState(false))
      toast.success(`${response.data.message}`);
      cancelChangePassword();
    }catch(error){
      dispatch(saveLoadingState(false))
      toast.error(error.response.data.message);
    }    
  }

  const cancelChangePassword = () => {    
    setPasswordData({
      oldPassword: "",
      newPassword: "",
    });
    setIsPasswordChanging(false);
  }

  return (
    <div className="appContainer">
      <div className="signupForm">
        <div className="profileEdit">
          <h2>Profile</h2>
          {!isEditing && (
            <Pencil
              className="editIcon"
              fill="#008009"
              onClick={() => handleEditClick()}
            />
          )}
        </div>

        <form onSubmit={handleSubmit} className="profileForm">
          <div className="profileImg">
            {!isEditing ? (
              <Image
                src={formData.profilePic ?? profileIcon}
                roundedCircle
                fluid
                className="profileIcon"
              />
            ) : (
              <>
                <label className="profileLabel">Profile picture:</label>
                <input type="file" name="profilePic" onChange={handleChange} />
              </>
            )}
          </div>
          <div className="profileDetails">
            <span className="profileLabel">Name:</span>
            <div className="profileValue">{userData?.username}</div>
          </div>
          <div className="profileDetails">
            <label className="profileLabel">Email:</label>
            <div className="profileValue">{userData?.email}</div>
          </div>

          <div className="editableField">
            <label className="profileLabel">
              Phone:
              {isEditing && <span className="required">*</span>}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              readOnly={!isEditing}
            />
          </div>

          {role === "user" ? (
            <div className="editableField">
              <label className="profileLabel">
                Address:
                {isEditing && <span className="required">*</span>}
              </label>
              <textarea
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                readOnly={!isEditing}
              />
            </div>
          ) : (
            <></>
          )}
          {isEditing && (
            <div className="profileButtons">
              <button className="primary" type="submit" disabled={!isFormValid}>
                Save Changes
              </button>
              <button className="secondary" onClick={handleCancelSave}>
                Cancel
              </button>
            </div>
          )}
        </form>
        {!isEditing && (
          <>
            <div className="changePassword">
              <KeyRound className="editIcon" fill="#008009" />
              <div className="changeNav" onClick={handlePasswordClick}>
                Change Password
              </div>
            </div>
            {isPasswordChanging && (
              <form onSubmit={changePassword} className="profileForm">
                <div>
                  <label>
                    Old Password:<span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div>
                  <label>
                    Password:<span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordData.newPassword.length < 8 && (
                    <span className="error">Password must be at least 8 characters long</span>
                  )}
                </div>
                <div className="profileButtons">
                  <button
                    className="primary"
                    type="submit"
                    disabled={passwordData.newPassword.length < 8 || passwordData.oldPassword.length === 0}
                  >
                    Change Password
                  </button>
                  <button className="secondary" onClick={cancelChangePassword}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Profile;
