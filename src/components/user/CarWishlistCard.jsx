import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/user/CarWishlistCard.css";
import { axiosInstance } from "../../config/axiosInstance";
import { saveLoadingState } from "../../redux/feature/appSlice";
import moment from "moment";

const CarWishlistCard = (props) => {
  const wishlist = props.car;
  const car = props.car?.carId;
  let startDate = new Date(wishlist?.startDate) || new Date();
  let endDate = new Date(wishlist?.endDate) || new Date();
  const noOfDays = wishlist?.noOfDays;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCar = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(saveLoadingState(true));
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/wishlist/${car._id}`,
      });
      props.setCars(props.carList.filter((item) => item.carId._id !== car._id));
      dispatch(saveLoadingState(false));
      toast.success("Car removed from favorites");
    } catch (error) {
      setFavorite(true);
      dispatch(saveLoadingState(false));
      toast.error(error.response.data.message);
    }
  };

  const checkoutCar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/checkout/${car._id}/${true}`);
  };

  const handleCarDeatils = () => {
    navigate(`/cars/${car._id}`)
  }

  return (
    <Card className="wishlist" onClick={handleCarDeatils}>
      <Card.Body>
        <div className="wishListContainer">
          <div className="carDetails">
            <h4 className="primaryText">{car.model}</h4>
            <h6 className="mb-2">{car.licensePlate}</h6>
            <span className="mb-2">
              {moment(startDate).format("DD/MM/YYYY")} -{" "}
              {moment(endDate).format("DD/MM/YYYY")}
            </span>
            <h6 className="secondaryText">Rs:{car.price}/Day</h6>
          </div>
          <div className="wishlistDetails">
            <h4 className="primaryText">Total: Rs: {car.price * noOfDays}</h4>
            {moment(startDate).isSameOrAfter(new Date()) ? (
              <>
                <button className="primary" onClick={checkoutCar}>
                  Checkout
                </button>
                <button className="cancel" onClick={removeCar}>
                  Remove
                </button>
              </>
            ):(
              <div className="smallText">Please select another dates.</div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarWishlistCard;
