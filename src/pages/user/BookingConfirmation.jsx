import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';


const BookingConfirmation = (props) => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(false);
  const [booking, setBooking] = useState();
  const navigate = useNavigate();
  const toAllBookings = () => {
    navigate("/bookings");
  };

  const fetchBooking = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/bookings/${id}`,
      });
      const data = response.data;
      setBooking(data);
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  const updateBookingStatus = async () => {
    try {
      const response = await axiosInstance({
        method: "PATCH",
        url: `/bookings/failed/${id}`,
      });
      const data = response.data;
      setBooking(data);
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/payment/transaction/${booking?.transactionId}`,
      });
      const data = response.data;
      setTransaction(data);
      if (data.status !== "complete") {
        updateBookingStatus();
      }
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id]);

  useEffect(() => {
    if (booking?.transactionId) {
      fetchTransaction();
    }
  }, [booking]);

  return (
    <div className="appContainer">
      {transaction?.status === "complete" ? (
        <div>
          <div className="primaryText">Booking Confirmed</div>
          <h3 className="largeText mt-3">
            We are pleased to inform you that your reservation
          </h3>
          <h4 className="mediumText">Your Booking is confirmed. Thank you!</h4>
          <h3 className="secondayText mt-4">Booking Details </h3>
          <h3 className="mediumText">
            Your booked car: <b>{booking?.carId?.model}</b>
          </h3>
          <Table bordered size="sm" responsive>
            <thead>
              <tr>
                <th>Booking No</th>
                <th>Checkin</th>
                <th>Checkout</th>
                <th>Total</th>
                <th>Transaction ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>43567</td>
                <td>{moment(booking?.startDate).format('DD/MM/YYYY')}</td>
                <td>{moment(booking?.endDate).format('DD/MM/YYYY')}</td>
                <td>{booking?.totalPrice}</td>
                <td>{booking?.transactionId}</td>
                <td>Confirmed</td>
              </tr>
            </tbody>
          </Table>
          <div className="link" onClick={toAllBookings}>
            View all bookings
          </div>
        </div>
      ) : (
        <>
          <div className="primaryText">Payment Failed</div>
          <h3 className="largeText mt-3">
            Please try again!
          </h3>
        </>
      )}
    </div>
  );
};

export default BookingConfirmation;
