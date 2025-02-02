import React, { useEffect } from "react";
import { Pencil } from "lucide-react";
import profileIcon from "../../assets/profile-icon.png";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveAdminData } from "../../redux/feature/adminSlice";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { saveUserData } from "../../redux/feature/userSlice";


const Profile = ({ role = "user" }) => {
  const user = {
    role: "user",
    update_api: "/user/update",
  };

  if (role === "admin") {
    user.role = "admin";
    user.update_api = "/admin/update";
  }
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({    
    phone: "",
    address: "",
    profilePic: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  
  let userData = localStorage.getItem("userData");
  if(userData){
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
        if(role === "admin")
        delete updatedFormData.address
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
      console.log("user", response)
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

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
        console.log(error);
      toast.error(error.response.data.message);
    }
  };

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
      </div>
    </div>
  );
};
export default Profile;
