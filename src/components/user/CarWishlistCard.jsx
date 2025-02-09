import React, {useEffect} from "react";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/user/CarWishlistCard.css";
import { axiosInstance } from "../../config/axiosInstance";
import { saveLoadingState } from "../../redux/feature/appSlice";

const CarWishlistCard = (props) => {  
  const wishlist = props.car;
  const car = props.car?.carId;
  let startDate = new Date(wishlist?.startDate) || new Date();
  let endDate = new Date(wishlist?.endDate) || new Date();
  startDate =  `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`; 
  endDate =  `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;  
  const noOfDays = wishlist?.noOfDays;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCar = async () => {
    dispatch(saveLoadingState(true));
    try {
        await axiosInstance({
          method: "DELETE",
          url: `/wishlist/${car._id}`
        });
        props.setCars(props.carList.filter((item) => item.carId._id !== car._id))
        dispatch(saveLoadingState(false));
        toast.success("Car removed from favorites");
      } catch (error) {
        setFavorite(true);
        dispatch(saveLoadingState(false));
        toast.error(error.response.data.message);
      }
  };

  const checkoutCar = () => {
    navigate(`/checkout/${car._id}/${true}`);
  };

  return (
    <Card className="wishlist">
      <Card.Body>
        <div className="wishListContainer">
          <div className="carDetails">
            <h4 className="primaryText">{car.model}</h4>
            <h6 className="mb-2">
              {car.licensePlate}
            </h6>
            <span className="mb-2">
              {startDate} - {endDate}
            </span>
            <h6 className="secondaryText">
              Rs:{car.price}/Day
            </h6>
          </div>
          <div className="wishlistDetails">
            <h4 className="primaryText">
              Total: Rs: {car.price * noOfDays}
            </h4>
            <button className="primary" onClick={() => checkoutCar()}>
              Checkout
            </button>
            <button className="cancel" onClick={() => removeCar(car.id)}>
              Remove
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarWishlistCard;
