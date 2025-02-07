import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import CarCard from "../../components/shared/CarCard";
import { Col, Row } from "react-bootstrap";
import CarSkeleton from "../../components/shared/CarSkeleton";
import { axiosInstance } from "../../config/axiosInstance";

const Cars = (props) => {
  const [showDeactivated, setShowDeactivated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchUrl, setFetchUrl] = useState(
    `/cars?q=${searchTerm}&page=${page}`
  );

  useEffect(() => {
    if (showDeactivated) {
        setFetchUrl(`/cars?active=${!showDeactivated}&q=${searchTerm}&page=${page}`);
    } else {
      setFetchUrl(`/cars?q=${searchTerm}&page=${page}`);
    }
  }, [showDeactivated, searchTerm, page]);

  useEffect(() => {
    fetchCars();
  }, [fetchUrl]);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance({
        method: "GET",
        url: fetchUrl,
      });
      const data = response.data;
      setCars(data.cars);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (e) => {
    setSearchTerm("");   
    setShowDeactivated(e.target.checked);
  };

  const handleInputChange = (event) => {
    setShowDeactivated(false);
    setSearchTerm(event.target.value);    
  };

  return (
    <div className="appContainer">
      <div className="d-flex align-items-center">
        <Form.Check
          type={"checkbox"}
          id={`disabledCars`}
          label={`Deactivated Cars`}
          checked={showDeactivated}
          onChange={handleCheckboxChange}
        />
        <div className="d-flex mx-2">
          <input
            className="ml-2"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />          
        </div>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <CarSkeleton />
        ) : (
          <Row>
            {cars?.map((value) => (
              <Col xs={12} sm={6} md={4} lg={3} xxl={3} key={value._id}>
                <CarCard car={value} isAdmin={true} />
              </Col>
            ))}
          </Row>
        )}
        {totalPages === 0 && (
          <div className="d-flex align-items-center justify-content-center m-5">
            <h4>No Cars to showcase</h4>
          </div>
        )}
        {error && (
          <div>
            <h2>Something went wrong!</h2>
            <h5>Try again.</h5>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cars;
