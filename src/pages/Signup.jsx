import React, { useState } from "react";
import "../styles/Signup.css";

const Signup = () => {
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
      if(value.length < 8){
        updatedErrors.password = "Password must be at least 8 characters long";
      }else{
        delete updatedErrors.password;
      }
    }
    if (name === "email") {
      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)){
        updatedErrors.email = "Invalid email address";
      }else{
        delete updatedErrors.email;
      }
    }
    
    setErrors(updatedErrors);

    const isFormValid = Object.values(updatedFormData).every(
      (field) => field !== ""
    ) && !Object.keys(updatedErrors).length;
    setIsFormValid(isFormValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        updatedErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    if (formData.password && formData.password.length < 8) {
      updatedErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      updatedErrors.email = "Invalid email address";
    }

    setErrors(updatedErrors);

    if (Object.keys(errors).length === 0) {
      // Handle form submission logic here
      console.log(formData);
    }
  };

  return (
    <div className="appContainer">      
      <div className="signupForm">
      <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:<span className="required">*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <span className="error">{errors.name}</span>}
          </div>
          <div>
            <label>Email:<span className="required">*</span></label>
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
            <label>Phone:<span className="required">*</span></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>          
          <div>
            <label>Address:<span className="required">*</span></label>
            <textarea
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div>
            <label>Password:<span className="required">*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div>
            <label>Profile Photo:</label>
            <input
              type="file"
              name="profilePic"
              onChange={handleChange}
            />
          </div>
          <button className="primary signupButton" type="submit" disabled={!isFormValid}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
