import CarSelector from "../../components/user/CarSelector";
import { useEffect, useState } from "react"
import "../../styles/user/CarListing.css";
import CarCard from "../../components/shared/CarCard";
import { Col, Row } from "react-bootstrap";
import CarSkeleton from "../../components/shared/CarSkeleton";
import { axiosInstance } from "../../config/axiosInstance";

const CarList = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchUrl, setFetchUrl] = useState(
    `/cars/all?q=${searchTerm}&page=${page}`
  );

  useEffect(() => {
    setFetchUrl(`/cars/all?q=${searchTerm}&page=${page}`);
  }, [searchTerm, page]);

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

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="appContainer">
      <div className="carSearchContainer">
        <CarSelector isLandingPage={false} />
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />          
        </div>
      </div>
      <div>
        <h2>Search for your wheel!</h2>
        {isLoading ? (
          <CarSkeleton />
        ) : (
          <Row>
            {cars?.map((value) => (
              <Col xs={12} sm={6} md={4} lg={3} xxl={3} key={value._id}>
                <CarCard car={value} isAdmin={false} />
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
export default CarList;
