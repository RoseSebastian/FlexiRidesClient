import React, { useState, useEffect } from "react";
import profileIcon from "../../assets/profile-icon.png";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import "../../styles/admin/EditUser.css";

const EditUser = (props) => {
  const { id, isMember } = useParams();
  console.log(id, isMember);
  const fetchApi = isMember ? `user/profile/${id}` : `admin/profile/${id}`;
  const editApi = isMember ? `user/edit/${id}` : `admin/edit/${id}`;
  const [user, setUser] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
    profilePic: null,
  });

  const fetchUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: fetchApi,
      });
      const data = response.data;
      setUser(data);
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  useEffect(() => {
    setFormData({
      username: user?.username || "",
      phone: user?.phone || "",
      address: user?.address || "",
      profilePic: user?.profilePic || null,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: files ? files[0] : value,
    };
    setFormData(updatedFormData);
    const isFormValid = Object.values(updatedFormData).every((field) => {
      if (user?.role !== "user") delete updatedFormData.address;
      return field !== "" || field == null || typeof field === File;
    });
    setIsFormValid(isFormValid);
  };

  const handleCancelSave = (e) => {
    e.preventDefault();
    setFormData({
      username: user?.username || "",
      phone: user?.phone || "",
      address: user?.address || "",
      profilePic: user?.profilePic || null,
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {};
  return (
    <div className="appContainer">
      <div className="signupForm">
        <h2>Edit User Details</h2>
        <form onSubmit={handleSubmit} className="profileForm">
          <div className="profileContainer">
            <Image
              src={user?.profilePic ?? profileIcon}
              roundedCircle
              className="profileIcon"
            />
            <div className="largeText">{user?.email}</div>
            <div>
              <label className="profileLabel">Profile picture:</label>
              <input type="file" name="profilePic" onChange={handleChange} />
            </div>
          </div>
          <div className="profileDetails">
            <label className="profileLabel">
              Name:
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profileDetails">
            <label className="profileLabel">
              Phone:
              <span className="required">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          {user?.role === "user" && (
            <div className="profileDetails">
              <label className="profileLabel">
                Address:
                <span className="required">*</span>
              </label>
              <textarea
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="profileButtons">
            <button className="primary" type="submit" disabled={!isFormValid}>
              Save Changes
            </button>
            <button className="secondary" onClick={handleCancelSave}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
