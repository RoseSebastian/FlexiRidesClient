import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import BookingCard from "../../components/shared/BookingCard";
import { RotatingLines } from "react-loader-spinner";
import { Col, Row } from "react-bootstrap";

const BookingList = (props) => {
  const [bookings, setBookings] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/bookings",
      });
      const data = response.data;
      setBookings(data);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <div className="appContainer">
        <div className="primaryText">Bookings</div>
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
              <Row>
                {bookings?.map((booking, index) => (
                  <Col xs={12} sm={6} xxl={6} key={booking?._id}>
                    <BookingCard booking={booking} />
                  </Col>
                ))}
              </Row>

              {bookings?.length === 0 && (
                <div className="d-flex flex-column justify-content-center m-5">
                  <h3>No Bookings</h3>
                  <h4>Continue browsing for cars and book your ride</h4>
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
export default BookingList;
