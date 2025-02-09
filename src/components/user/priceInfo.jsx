import React from "react";
import "../../styles/user/priceInfo.css";

const PriceInfo = (props) => {
  const car = props.car;
  const noOfDays = props.noOfDays;
  const price = car?.price * noOfDays;
  const deposit = parseInt(`${import.meta.env.VITE_DEPOSIT}`);
  const fee = parseInt(`${import.meta.env.VITE_PLATFORM_FEE}`);
  return (
    <div className="priceDetails">
      <div className="mediumText">
        Trip Amount (this does not include fuel): <b> Rs.{price}</b>
      </div>
      <div className="mediumText">Refundable Deposit: <b>{`Rs: ${deposit}`}</b></div>
      <div className="mediumText">Convenience Fee: <b>{`Rs: ${fee}`}</b></div>
      <div className="priceItem">
        <div>
          <div className="mediumText">Total Price:</div>
          <div className="smallText">Inclusive of taxes</div>
        </div>
        <div className="primaryText">Rs: {price + deposit + fee}</div>
      </div>
    </div>
  );
};

export default PriceInfo;
