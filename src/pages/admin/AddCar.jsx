import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { saveLoadingState } from "../../redux/feature/appSlice";
import Form from "react-bootstrap/Form";

export function AddCar(props) {
  const user = useSelector((state) => state.admin.adminData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dealers, setDealers] = useState();

  const [formData, setFormData] = useState({
    model: "",
    licensePlate: "",
    bodyType: "",
    fuelType: "",
    transmission: "",
    year: "",
    seats: "",
    dealerId: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const getAllDealers = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/allDealers",
      });
      const data = response.data;
      setDealers(data);
    } catch (error) {}
  };

  useEffect(() => {
    console.log("user", user);
    if (user?.role === "admin") {
      getAllDealers();
    } else {
      setFormData({
        ...formData,
        dealerId: user._id,
      });
    }
  }, []);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: files ? files[0] : value,
    };
    setFormData(updatedFormData);   

    const isFormValid = Object.values(updatedFormData).every((field) => {
      return field !== "" || field == null || typeof field === File;
    });
    setIsFormValid(isFormValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch(saveLoadingState(true));
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: 'cars/add',
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(saveLoadingState(false));
        toast.success(`${response.data.message}`);        
      } catch (error) {
        dispatch(saveLoadingState(false));
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="appContainer">
      <div className="signupForm">
        <h2>Add a new car</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Model Name:<span className="required">*</span>
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-3">
            <label>
              License Plate:<span className="required">*</span>
            </label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-3">
            <label>
              Body Type:<span className="required">*</span>
            </label>
            <input
              type="text"
              name="bodyType"
              value={formData.bodyType}
              placeholder="Sedan/SUV/Hatchback"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-3">
            <label>
              Fuel Type:<span className="required">*</span>
            </label>
            <input
              type="text"
              name="fuelType"
              placeholder="Petrol/Diesel/Electric"
              value={formData.fuelType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-3">
            <label>
              Transmission:<span className="required">*</span>
            </label>
            <input
              type="text"
              name="transmission"
              placeholder="Automatic/Manual"
              value={formData.transmission}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-3">
            <label>
              Year of make:<span className="required">*</span>
            </label>
            <input
              type="text"
              name="year"
              placeholder="YYYY"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-3">
            <label>
              No of Seats:<span className="required">*</span>
            </label>
            <input
              type="Number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-3">
            <label>
              Price(per day):<span className="required">*</span>
            </label>
            <input
              type="Number"
              placeholder="Rs per day"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <Form.Select aria-label="Dealer" value={formData.dealerId} name="dealerId" onChange={handleChange} className="mt-3">
          <option>Select Dealer</option>
            {dealers?.map((item) => (
              <option value={item?._id}>{item?.username}</option>
            ))}
          </Form.Select>

          <div className="mt-3">
            <label>Car Photo:</label>
            <input type="file" name="image" onChange={handleChange} />
          </div>
          <button
            className="primary signupButton mt-4"
            type="submit"
            disabled={!isFormValid}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddCar;
