import CarSelector from "../../components/user/CarSelector";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/user/CarListing.css";
import { useFetch } from "../../hooks/useFetch";
import CarCard from "../../components/shared/CarCard";
import { Col, Row } from "react-bootstrap";
import CarSkeleton from "../../components/shared/CarSkeleton";

const CarList = (props) => {
  const [cars, isLoading, error] = useFetch("/cars/all");
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  console.log(isLoading, error)
  const searchCar = () => {};

  return (
    <div className="appContainer">
      <div className="carSearchContainer">
        <CarSelector isLandingPage={false} />
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="secondary" onClick={searchCar}>
            Search
          </button>
        </div>
      </div>
      <div>
        <h2>Your Cars!</h2>
        {isLoading ? (
          <CarSkeleton />
        ) : (
          <Row>
            {cars?.map((value) => (
              <Col xs={12} sm={6} md={4} lg={3} xxl={3}>
                <CarCard key={value._id} car={value} isAdmin={false} />
              </Col>
            ))}
          </Row>
        )}
        {error && (
          <div>
            <h2>Something went wrong!</h2>
            <h5>Try again.</h5>
            </div>
        )}
      </div>
    </div>
  );
};
export default CarList;
