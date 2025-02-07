import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import carImg from "../../assets/carImg.jpg";
import "../../styles/shared/CarCard.css";
import { Heart, Trash2, CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { saveLoadingState } from "../../redux/feature/appSlice";
import { useFetch } from "../../hooks/useFetch";

const CarCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [car, setCar] = useState(props.car);
  const [isFavorite, setFavorite] = useState(false);
  const startDate = useSelector((state) => new Date(state.date.Dates.startDate));
  const endDate = useSelector((state) => new Date(state.date.Dates.endDate));
  const noOfDays = useSelector((state) => state.date.noOfDays);
  
  const isAdmin = props.isAdmin;

  const isFavoriteCar = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/wishlist/status/${car._id}`,
      });
      setFavorite(response.data);      
      // setStartDate(useSelector((state) => new Date(state.date.Dates.startDate)));
      // setEndDate(useSelector((state) => new Date(state.date.Dates.endDate)))
    } catch (error) {
      setFavorite(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      isFavoriteCar();
    }
  }, []);

  const handleCarView = () => {
    navigate(isAdmin ? `/admin/cars/${car._id}` : `/cars/${car._id}`);
  };

  const handleFavorites = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(saveLoadingState(true));
    if(isFavorite){
      try {
        await axiosInstance({
          method: "DELETE",
          url: `/wishlist/${car._id}`
        });
        setFavorite(false);
        dispatch(saveLoadingState(false));
        toast.success("Car removed from favorites");
      } catch (error) {
        setFavorite(true);
        dispatch(saveLoadingState(false));
        toast.error(error.response.data.message);
      }
    }else{
      try {
        await axiosInstance({
          method: "POST",
          url: `/wishlist`,
          data: { carId: car._id, startDate, endDate, noOfDays },
        });
        setFavorite(true);
        dispatch(saveLoadingState(false));
        toast.success("Car added to favorites");
      } catch (error) {
        setFavorite(false);
        dispatch(saveLoadingState(false));
        toast.error(error.response.data.message);
      }
    }    
  };

  const handleDeactivate = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(saveLoadingState(true));
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: `/cars/status/${car._id}`,
      });
      const updatedCar = response.data;
      setCar(updatedCar);
      dispatch(saveLoadingState(false));
      toast.success("Car status updated successfully");
    } catch (error) {
      dispatch(saveLoadingState(false));
      toast.error(error.response.data.message);
    }
  };

  return (
    <Card
      className={car.isActive ? "cardContainer" : "cardDeactive"}
      onClick={handleCarView}
    >
      <Card.Img
        className="carImg"
        variant="top"
        src={car.image ? car.image : carImg}
      />
      <Card.Body>
        <h4>{car.model}</h4>
        <div className="carDetails">
          <span>{car.licensePlate}</span>
          <div className="price">Rs.{car.price}/Day</div>
        </div>
        <div className="carSpecials">
          <div className="carFeature">
            <span>{car.transmission}</span> |<span> {car.fuelType}</span> |
            <span> {car.seats} Seater</span>
          </div>
          {!isAdmin ? (
            <button onClick={handleFavorites}>
              {isFavorite ? <Heart color="red" fill="red" /> : <Heart />}
            </button>
          ) : (
            <button onClick={handleDeactivate}>
              {car.isActive ? <Trash2 /> : <CirclePlus />}
            </button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
