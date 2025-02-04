import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import carImg from "../../assets/carImg.jpg";
import "../../styles/shared/carCard.css";
import { Heart } from "lucide-react";
import { useState } from "react";

const CarCard = (props) => {
  const navigate = useNavigate();
  const [car, setCar] = useState(props.car);
  const isAdmin = props.isAdmin;
  const handleCarView = () => {
    navigate(isAdmin ? `/admin/cars/${car._id}` : `/cars/${car._id}`);
  };

  const handleFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();    
  };

  return (
    <Card className="cardContainer" onClick={handleCarView}>
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
          {!isAdmin && (
            <button onClick={handleFavorites}>
              {car.isFavorite ? <Heart color="red" fill="red" /> : <Heart />}
            </button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
