import React from "react";
import Card from "react-bootstrap/Card";
import Rating from "react-rating";
import { Dot, Heart, Cog, Star } from "lucide-react";
import { useEffect, useState } from "react";

const BookingCard = (props) => {
  const car = props.booking.carId;
  let startDate = new Date(props.booking?.startDate) || new Date();
  let endDate = new Date(props.booking?.endDate) || new Date();
  startDate = `${startDate.getDate()}/${
    startDate.getMonth() + 1
  }/${startDate.getFullYear()}`;
  endDate = `${endDate.getDate()}/${
    endDate.getMonth() + 1
  }/${endDate.getFullYear()}`;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleChange = (rate) => {
    setRating(rate);
  };
  const handleChangeComment = (value) => {
    setComment(value);
  };

  return (
    <Card className="wishlist">
      <Card.Body>
        <div className="wishListContainer">
          <div className="carDetails">
            <h4 className="primaryText">{car?.model}</h4>
            <h6 className="mb-2">{car?.licensePlate}</h6>
            <span className="mb-2">
              {startDate} - {endDate}
            </span>
            <h6 className="secondaryText">Booking No: {props.booking?._id}</h6>
          </div>
          <div className="wishlistDetails align-items-start">
            <h4 className="primaryText">Total: {props.booking?.totalPrice}</h4>
            <div>
              <div className="smallText mb-1">Rate your car!</div>
              <Rating
                emptySymbol={<Star color="#FEDB2C" />}
                fullSymbol={<Star color="#FEDB2C" fill="#FEDB2C" />}
                onChange={(rate) => handleChange(rate)}
                initialRating={rating}
              />
              <textarea
                className="mt-3"
                value={comment}
                placeholder="Reviews"
                onChange={(value) => handleChangeComment(value)}
              />
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default BookingCard;
