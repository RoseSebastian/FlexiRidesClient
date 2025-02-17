import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-hot-toast";
import Image from "react-bootstrap/Image";
import CarSelector from "../../components/user/CarSelector";
import carImg from "../../assets/carImg.jpg";
import { Dot, Heart, Cog, Star } from "lucide-react";
import { saveLoadingState } from "../../redux/feature/appSlice";
import { Col, Row } from "react-bootstrap";
import PriceInfo from "../../components/user/priceInfo";
import "../../styles/shared/CarDetails.css";
import Rating from "react-rating";
import Carousel from "react-bootstrap/Carousel";
import ReviewCard from "../../components/user/ReviewCard";

const CarDetails = ({ role = "user" }) => {
  const { id } = useParams();
  const [car, setCar] = useState();
  const [reviews, SetReviews] = useState([]);
  const [avgReview, SetAvgReview] = useState();
  const [noReview, SetNoReview] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const startDate = useSelector(
    (state) => new Date(state.date.Dates.startDate)
  );
  const endDate = useSelector((state) => new Date(state.date.Dates.endDate));
  const noOfDays = useSelector((state) => state.date.noOfDays);

  const [isEditing, setEditing] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = {
    role: "user",
  };
  if (role === "admin") {
    user.role = "admin";
  }
  const fetchCar = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/cars/${id}`,
      });
      const data = response.data;
      setCar(data); 
    } catch (error) {
      console.log(error)
      toast(error.response.data.message);
     
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/reviews/${id}`,
      });
      const data = response.data.data;
      SetReviews(data);
      SetNoReview(false);
    } catch (error) {
      SetNoReview(true);
    }
  };

  const fetchAverageReview = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/reviews/averageRating/${id}`,
      });
      const data = response.data;
      SetAvgReview(data.data);
      SetNoReview(false);
    } catch (error) {
      SetNoReview(true);
    }
  };

  const isFavoriteCar = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/wishlist/status/${id}`,
      });
      setFavorite(response.data);
    } catch (error) {
      setFavorite(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCar();
      fetchReviews();
      fetchAverageReview();
      if (user && user.role === "user") {
        isFavoriteCar();
      }
    }
  }, [id]);

  // useEffect(() => {
    
  // }, [user]);

  const handleFavorites = async (e) => {
    dispatch(saveLoadingState(true));
    if (isFavorite) {
      try {
        await axiosInstance({
          method: "DELETE",
          url: `/wishlist/${car._id}`,
        });
        setFavorite(false);
        dispatch(saveLoadingState(false));
        toast.success("Car removed from favorites");
      } catch (error) {
        setFavorite(true);
        dispatch(saveLoadingState(false));
        toast.error(error.response.data.message);
      }
    } else {
      try {
        await axiosInstance({
          method: "POST",
          url: `/wishlist`,
          data: { carId: id, startDate, endDate, noOfDays },
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

  return (
    <>
      <div className="appContainer">
        <div className="carContainer">
          <div className="car-details">
            {user.role === "user" && <CarSelector isLandingPage={false} />}
            <div className="detailsContainer">
              <Image
                className="car-img"
                src={car?.image ? car.image : carImg}
              />
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <h3 className="primaryText">{car?.model}</h3>
                  <div className="mediumText">{car?.licensePlate}</div>
                  <div>
                    <span>{car?.transmission}</span>
                    <Dot /> <span> {car?.fuelType}</span> <Dot />
                    <span> {car?.seats} Seater</span>
                  </div>
                </div>
                <div>
                  <h3 className="primaryText">Rs.{car?.price}/Day</h3>
                  {user.role === "user" && (
                    <button onClick={handleFavorites}>
                      {isFavorite ? (
                        <Heart color="red" fill="red" />
                      ) : (
                        <Heart />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="features">
                <div className="primaryText mb-2">Features</div>
                {car?.features.length === 0 ? (
                  <div>No features available</div>
                ) : (
                  <div className="featureList">
                    <Row>
                      {car?.features.map((value) => (
                        <Col
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          xxl={3}
                          key={value._id}
                        >
                          <span className="d-flex align-items-center">
                            {" "}
                            <Cog /> {value.name}
                          </span>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <div className="primaryText">Ratings & Reviews</div>
                {noReview ? (
                  <div>No review yet!</div>
                ) : (
                  <div className="mt-2">
                    <div className="d-flex align-items-center">
                      <div className="ratingValue">{Number(avgReview).toFixed(1)}</div>
                      <Rating
                        emptySymbol={<Star color="#FEDB2C" />}
                        fullSymbol={<Star color="#FEDB2C" fill="#FEDB2C" />}
                        initialRating={avgReview}
                        readonly
                      />
                    </div>
                    <div>
                      <div>Reviews</div>

                      <Carousel>
                        {reviews?.map((review) => (
                          <Carousel.Item key={review._id}>
                            <ReviewCard review={review} />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {user.role === "user" && (<div className="carOperations">
            <div className="carPriceDetails">              
                <PriceInfo car={car} noOfDays={noOfDays} />              
              <div className="d-flex justify-content-center">
                <button
                  className="primary mt-3"
                  onClick={() => navigate(`/checkout/${car._id}/${false}`)}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>)}
          {user.role !== "user" && (
             <div className="carPriceDetails">
              <button className="secondary">Edit</button>
              
             </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CarDetails;
