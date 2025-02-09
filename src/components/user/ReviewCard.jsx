import React from "react";
import Card from "react-bootstrap/Card";
import "../../styles/user/ReviewCard.css"
import { Star } from "lucide-react";

const ReviewCard = (props) => {
  const review = props.review;

  return (
    <Card className="reviewCard">
      <Card.Body>
        <div className="reviewHeader">
          <div>
            <div className="largeText">{review?.userId.username}</div>
            <div className="smallText">On {new Date(review?.createdAt).toDateString()}</div>
          </div>
          <div className="ratingContainer">
            <div className="primaryText">{review?.rating}</div>
            <Star color="#FEDB2C" fill="#FEDB2C" size={18}/>            
          </div>
        </div>
        <div className="">
            <div className="secondaryText mt-2">Comments</div>
            {review?.comment}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
