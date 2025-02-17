import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import PriceInfo from "../../components/user/priceInfo";
import "../../styles/user/Checkout.css";
import { loadStripe } from "@stripe/stripe-js";
import moment from 'moment';

const Checkout = (props) => {
  const { carId, isFavorite } = useParams();
  const [car, setCar] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noOfDays, setNoOfDays] = useState();
  const deposit = parseInt(`${import.meta.env.VITE_DEPOSIT}`);
  const fee = parseInt(`${import.meta.env.VITE_PLATFORM_FEE}`);
  let tempStartDate = useSelector(
    (state) => new Date(state.date.Dates.startDate)
  );
  let tempEndDate = useSelector((state) => new Date(state.date.Dates.endDate));
  let tempNoOfDays = useSelector((state) => state.date.noOfDays);

  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const fetchCar = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/cars/${carId}`,
      });
      const data = response.data;
      setCar(data);
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  const whishlistCar = async () => {
    if (isFavorite === "true") {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: `/wishlist/status/${carId}`,
        });
        setStartDate(new Date(response.data.startDate));
        setEndDate(new Date(response.data.endDate));
        setNoOfDays(response.data.noOfDays);
      } catch (error) {}
    }
  };

  const setBookingDates = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setNoOfDays(tempNoOfDays);
  };

  useEffect(() => {
    if (carId) {
      fetchCar();
    }
  }, [carId]);

  useEffect(() => {
    if (isFavorite === "true") {
      whishlistCar();
    } else {
      setBookingDates();
    }
  }, [isFavorite]);

  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_PAYMENT_KEY);
      const price = car?.price * noOfDays + fee + deposit;
      const session = await axiosInstance({
        url: "/payment/create-checkout-session",
        method: "POST",
        data: {
          car: car,
          startDate: startDate,
          endDate: endDate,
          totalPrice: price,
        },
      });
      const result = stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="appContainer">
      <div className="primaryText">Confirm your booking</div>
      <div className="checkout">
        <div className="checkoutContainer">
          <div className="checkoutItems">
            <div className="secondaryText">Booking Car</div>
            <div className="mediumText">
              Car: <b>{car?.model}</b>
            </div>
            <div className="mediumText">
              License Plate: <b>{car?.licensePlate}</b>
            </div>
          </div>

          <div className="checkoutItems">
            <div className="secondaryText">Booking Dates</div>
            <div className="mediumText">
              Start Date: <b>{moment(startDate).format('DD/MM/YYYY')}</b>
            </div>
            <div className="mediumText">
              End Date: <b>{moment(endDate).format('DD/MM/YYYY')}</b>
            </div>
            <div className="mediumText">
              No of Days: <b>{noOfDays}</b>
            </div>
          </div>

          <div className="checkoutItems">
            <div className="secondaryText">Booking Address</div>
            <div className="mediumText">
              Name: <b>{userData?.username}</b>
            </div>
            <div className="mediumText">
              Registered Email: <b>{userData?.email}</b>
            </div>
            <div className="mediumText">
              Address: <b>{userData?.address}</b>
            </div>
          </div>
        </div>
        <div className="checkoutPayment">
          <div className="paymentDetails">
            <div className="checkoutItems">
              <div className="secondaryText">Price Details</div>
              <PriceInfo car={car} noOfDays={noOfDays} />
            </div>
            <div>
              <b>
                <div className="smallText mt-3">* Payment through RazorPay</div>
              </b>
            </div>
          </div>

          <button className="primary pay" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
