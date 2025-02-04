import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveDate } from "../../redux/feature/dateSlice";

const CarSelector = ({isLandingPage = true}) => {
  const [startDate, setStartDate] = useState(useSelector((state) => new Date(state.date.Dates.startDate)));
  const [endDate, setEndDate] = useState(useSelector((state) => new Date(state.date.Dates.endDate)));
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   setStartDate(useSelector((state) => new Date(state.date.Dates.startDate)));
//   setEndDate(useSelector((state) => new Date(state.date.Dates.endDate)));

  const handleChange = ([newStartDate, newEndDate]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  useEffect(() => {
    if (startDate && endDate) {
      let diffInTime = endDate.getTime() - startDate.getTime();
      let noOfDays = Math.round(diffInTime / (1000 * 3600 * 24));
      dispatch(
        saveDate({
          noOfDays: noOfDays + 1,
          Dates: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        })
      );
    }
  }, [startDate, endDate]);

  const handleSearch = () => {
    if (startDate && endDate) {
      navigate("/cars");
    }
  };

  return (
    <div className="dateContainer">
      <h4>Select start and end date of your trip!</h4>
      <DatePicker
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        minDate={new Date()}
        selectsRange
        dateFormat="dd/MM/yyyy"
      />
      {isLandingPage && <button className="primary" onClick={handleSearch}>
        Search your car!
      </button>}
    </div>
  );
};
export default CarSelector;
