import React, { useState } from "react";
import "../../styles/shared/Signup.css";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = ({ role = "user" }) => {
  const navigate = useNavigate();

  const user = {
    role: "user",
    register_api: "/user/register",
    home_url: "/",
  };

  if (role === "admin") {
    user.role = "admin";
    user.register_api = "/admin/register";
    user.home_url = "/admin";
  }

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    profilePic: null,
  });  
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: files ? files[0] : value,
    };
    setFormData(updatedFormData);

    const updatedErrors = { ...errors };
    if (name === "password") {
      if (value.length < 8) {
        updatedErrors.password = "Password must be at least 8 characters long";
      } else {
        delete updatedErrors.password;
      }
    }
    if (name === "email") {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        updatedErrors.email = "Invalid email address";
      } else {
        delete updatedErrors.email;
      }
    }
    setErrors(updatedErrors);

    const isFormValid =
      Object.values(updatedFormData).every((field) => {
        return field !== "" || field == null || typeof field === File;
      }) && !Object.keys(updatedErrors).length;
    setIsFormValid(isFormValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: user.register_api,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success(`${response.data.message} Please login to continue`);
        setTimeout(() => {
          navigate(user.home_url);
        }, 2000);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="appContainer">
      <div className="signupForm">        
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:<span className="required">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              Email:<span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label>
              Phone:<span className="required">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              Address:<span className="required">*</span>
            </label>
            <textarea
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              Password:<span className="required">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div>
            <label>Profile Photo:</label>
            <input type="file" name="profilePic" onChange={handleChange} />
          </div>
          <button
            className="primary signupButton"
            type="submit"
            disabled={!isFormValid}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
