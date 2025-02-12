import React from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = (props) => {
    const navigate = useNavigate();
    const toAllBookings = () => {
        navigate("/bookings");
    }

  return (
    <div className="appContainer">
      <div>
        <div className="primaryText">Booking Confirmed</div>
        <h3 className="largeText mt-3">
          We are pleased to inform you that your reservation
        </h3>
        <h4 className="mediumText">Your Booking is confirmed. Thank you!</h4>
        <h3 className="secondayText mt-4">Booking Details </h3>
        <h3 className="mediumText">Your booked car: <b>Maruti Suzuki Baleno</b> </h3>
        <Table bordered size="sm" responsive>
          <thead>
            <tr>
              <th>Booking No</th>
              <th>Checkin</th>
              <th>Checkout</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td>43567</td>
                <td>20/1/2025</td>
                <td>24/1/2025</td>
                <td>Rs: 500</td>
                <td>Confirmed</td>
              </tr>
            </tbody>
          
        </Table>
        <div className="link" onClick={toAllBookings}>View all bookings</div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
