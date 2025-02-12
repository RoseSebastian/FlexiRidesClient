import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import PriceInfo from "../../components/user/priceInfo";
import "../../styles/user/Checkout.css";

const Checkout = (props) => {
  const { carId, isFavorite } = useParams();
  const [car, setCar] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noOfDays, setNoOfDays] = useState();
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
        let startDate = new Date(response.data.startDate);
        let endDate = new Date(response.data.endDate);
        setStartDate(
          `${startDate.getDate()}/${
            startDate.getMonth() + 1
          }/${startDate.getFullYear()}`
        );
        setEndDate(
          `${endDate.getDate()}/${
            endDate.getMonth() + 1
          }/${endDate.getFullYear()}`
        );
        setNoOfDays(response.data.noOfDays);
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (carId) {
      fetchCar();
      whishlistCar();
    }
  }, [carId]);

  useEffect(() => {
    if (isFavorite === "true") {
      whishlistCar();
    } else {
      setStartDate(
        `${tempStartDate.getDate()}/${
          tempStartDate.getMonth() + 1
        }/${tempStartDate.getFullYear()}`
      );
      setEndDate(
        `${tempEndDate.getDate()}/${
          tempEndDate.getMonth() + 1
        }/${tempEndDate.getFullYear()}`
      );
      setNoOfDays(tempNoOfDays);
    }
  }, [isFavorite]);

  const handlePayment = () => {
    navigate("/confirmation")
  }

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
              Start Date: <b>{startDate}</b>
            </div>
            <div className="mediumText">
              End Date: <b>{endDate}</b>
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
            <b><div className="smallText mt-3">* Payment through RazorPay</div></b>
            </div>
          </div>

          <button className="primary pay" onClick={handlePayment}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
