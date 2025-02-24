import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Rating from "react-rating";
import moment from "moment";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { Star, Pencil } from "lucide-react";

const BookingCard = (props) => {
  const car = props.booking.carId;
  const isAdmin = props.isAdmin;
  const [status, setStatus] = useState(props.booking?.status);
  let startDate = new Date(props.booking?.startDate) || new Date();
  let endDate = new Date(props.booking?.endDate) || new Date();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

  const handleChange = (rate) => {
    if (!isReviewed)
      setReview({
        ...review,
        rating: rate,
      });
  };
  const handleChangeComment = (e) => {
    setReview({
      ...review,
      comment: e.target.value,
    });
  };

  const updateBookingStatus = async () => {
    try {
      const response = await axiosInstance({
        method: "PATCH",
        url: `/bookings/${props.booking?._id}`,
      });
      setStatus("canceled");
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  const fetchReview = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/reviews/booking/${props.booking?._id}`,
      });
      console.log(response.data?.data);
      if (response.data?.data?.length > 0) {
        setIsReviewed(true);
        setReview({
          rating: response.data?.data[0]?.rating,
          comment: response.data?.data[0]?.comment,
        });
      } else {
        setIsReviewed(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (status === "confirmed") {
      fetchReview();
    }
  }, [status]);

  const submitReview = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/reviews/addReview`,
        data: {
          carId: car?._id,
          bookingId: props.booking?._id,
          rating: review.rating,
          comment: review.comment,
        },
      });
      setIsReviewed(true);
      toast(response.data.message);
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  return (
    <Card className="bookingCard">
      <Card.Body>
        <div className="wishListContainer">
          <div className="carDetails">
            <h4 className="primaryText">{car?.model}</h4>
            <h6 className="mb-2">{car?.licensePlate}</h6>
            <span className="mb-2">
              {moment(startDate).format("DD/MM/YYYY")} -{" "}
              {moment(endDate).format("DD/MM/YYYY")}
            </span>
            <h6 className="secondaryText">Booking No: {props.booking?._id}</h6>
          </div>
          <div className="wishlistDetails align-items-start">
            <h4 className="primaryText">Total: {props.booking?.totalPrice}</h4>
            <div>
              {(status === "failed" || status === "canceled") && (
                <h4> {status} </h4>
              )}
              {(status === "confirmed" && isAdmin=== false &&
                moment(startDate).isAfter(new Date())) && (
                  <button className="cancel" onClick={updateBookingStatus}>
                    Cancel
                  </button>
                )}
            </div>

            {(moment(endDate).isBefore(new Date()) && status === "confirmed" && isAdmin=== false) && (
              <div>
                <div className="d-flex">
                <div className="smallText mb-1">Rate your car!</div>
                {isReviewed && (
                  <Pencil
                    className="editIcon"
                    fill="#008009"
                    onClick={() => setIsReviewed(!isReviewed)}
                  />
                )}
                </div>                
                <Rating
                  emptySymbol={<Star color="#FEDB2C" />}
                  fullSymbol={<Star color="#FEDB2C" fill="#FEDB2C" />}
                  onChange={(rate) => handleChange(rate)}
                  initialRating={review.rating}
                  readOnly={isReviewed}
                />
                <textarea
                  className="mt-3"
                  value={review.comment}
                  placeholder="Reviews"
                  onChange={handleChangeComment}
                  readOnly={isReviewed}
                />
                <div>
                  {!isReviewed && (
                    <button className="secondary" onClick={submitReview}>
                      Submit
                    </button>
                  )}
                </div>
              </div>
            )}
            {(isAdmin === true && isReviewed) && (
              <div className="adminRating">
                <div className="smallText mb-1">Rating by customer on this booking</div>
                <Rating
                  emptySymbol={<Star color="#FEDB2C" />}
                  fullSymbol={<Star color="#FEDB2C" fill="#FEDB2C" />}
                  initialRating={review.rating}
                  readOnly
                />
                <div className="mediumText m-2">{review.comment}</div>                
              </div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default BookingCard;
