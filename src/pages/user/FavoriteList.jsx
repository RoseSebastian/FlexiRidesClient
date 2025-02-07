import React, {useState, useEffect} from "react";
import { RotatingLines } from "react-loader-spinner";
import CarWishlistCard from "../../components/user/CarWishlistCard";
import { Col, Row } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";

const FavoriteList = (props) => {
  const [cars, setCars] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance({
        method: "GET",
        url: '/wishlist',
      });
      const data = response.data;
      setCars(data);      
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <div className="appContainer">
        {isLoading ? (
          <RotatingLines
            strokeColor="#008009"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
            wrapperClass="wrapper-class"
          />
        ) : (
          <div className="">
            <section>
              <h1 className="">Your favorite cars!</h1>
            </section>
            <section>
              <Row>
                {cars?.map((car, index) => (
                  <Col xs={12} sm={6} xxl={4} key={car?._id}>
                    <CarWishlistCard setCars= {setCars} car={car} carList={cars}/>
                  </Col>
                ))}
              </Row>

              {cars?.length === 0 && (
                <div className="d-flex flex-column justify-content-center m-5">
                  <h3>No favorite cars to showcase</h3>
                  <h4>Continue browsing for cars</h4>
                </div>
              )}
              {error && (
                <div className="d-flex justify-content-center m-5">
                  <h2>Something went wrong!</h2>
                  <h5>Try again.</h5>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </>
  );
};
export default FavoriteList;
