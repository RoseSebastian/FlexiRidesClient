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

  const [isEditing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    price: "",
    image: "",
    features: [],
  });
  const [features, setFeatures] = useState([]); // Features from DB
  const [selectedFeatures, setSelectedFeatures] = useState([]); // Selected features
  const [newFeature, setNewFeature] = useState(""); // New feature input
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
      console.log(error);
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

  const fetchFeatures = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/features/allFeatures`,
      });
      const featureList = response.data;
      setFeatures(featureList);
      const selected = featureList.filter((item) =>
        car?.features.some((f) => f._id === item._id)
      );
      setSelectedFeatures(selected);
      setFormData({
        price: car?.price,
        image: car?.image,
        features: selected,
      });
    } catch (error) {
      toast(error.response.data.message);
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

  useEffect(() => {
    if (car && user.role !== "user") {
      fetchFeatures();
    }
  }, [car]);

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(
      (prev) =>
        prev.includes(feature)
          ? prev.filter((f) => f !== feature) // Uncheck
          : [...prev, feature] // Check
    );
    setEditing(true);
  };

  const handleAddFeature = async () => {
    if (newFeature.trim() && !features.includes(newFeature)) {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: `/features/addFeature`,
          data: { name: newFeature },
        });
        setFeatures((prev) => [...prev, response.data.data]);
        toast(response.data.message);
        setSelectedFeatures((prev) => [...prev, response.data.data]);
        setNewFeature("");
        setEditing(true);
      } catch (error) {
        toast(error.response.data.message);
      }
    }
  };

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

  const handleChange = async (e) => {
    e.preventDefault();
    setEditing(true);
    const { name, value, files } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: files ? files[0] : value,
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(saveLoadingState(true));
    const featuresAdded = selectedFeatures.flatMap((f) => f._id);
    const formDataToSend = new FormData();
    formDataToSend.append("model", car?.model);
    formDataToSend.append("licensePlate", car?.licensePlate);
    formDataToSend.append("bodyType", car?.bodyType);
    formDataToSend.append("fuelType", car?.fuelType);
    formDataToSend.append("transmission", car?.transmission);
    formDataToSend.append("year", car?.year);
    formDataToSend.append("seats", car?.seats);
    formDataToSend.append("dealerId", car?.dealerId);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("image", formData.image);
    featuresAdded.forEach((featureId) => {
      formDataToSend.append("features", featureId);
    });
    const updatedCar = {
      ...car,
      price: formData.price,
      image: formData.image,
      features: featuresAdded,
    };
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: `cars/${car?._id}`,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchCar();
      dispatch(saveLoadingState(false));
    } catch (error) {
      dispatch(saveLoadingState(false));
      toast.error(error.response.data.message);
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
                      <div className="ratingValue">
                        {Number(avgReview).toFixed(1)}
                      </div>
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
          {user.role === "user" && (
            <div className="carOperations">
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
            </div>
          )}
          {user.role !== "user" && (
            <div className="carPriceDetails">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Change Car Image:</label>
                  <input type="file" name="image" onChange={handleChange} />
                </div>
                <div className="mt-4">
                  <label>Price(per day):</label>
                  <span className="required">*</span>
                  <input
                    type="Number"
                    placeholder="Rs per day"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                {features.length > 0 && (
                  <>
                    <h2 className="largeText mt-4">Select Car Features</h2>
                    <div className="mt-4 featueList">
                      {features.map((feature, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            checked={selectedFeatures.includes(feature)}
                            onChange={() => handleFeatureToggle(feature)}
                            className="mr-2"
                          />
                          <label>{feature.name}</label>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <div className="mt-4">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add new feature"
                    className="border p-2 rounded w-full"
                  />
                  <button onClick={handleAddFeature} className="mt-2 secondary">
                    Add Feature
                  </button>
                </div>
                <div>
                  <button
                    className="primary signupButton"
                    type="submit"
                    disabled={!isEditing || formData.price === ""}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CarDetails;
