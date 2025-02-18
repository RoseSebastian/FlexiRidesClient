import React from "react";
import imgBackground from "../../assets/flexi_background.jpg";
import suv from "../../assets/suv.png";
import sedan from "../../assets/sedan.png";
import hatchback from "../../assets/hatchback.png";
import electric from "../../assets/electric.png";
import "../../styles/shared/landingPage.css";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { UserRoundCog, CarTaxiFront, BookUser } from "lucide-react";
import CarSelector from "../../components/user/CarSelector";
import { useSelector } from "react-redux";

const LandingPage = ({ role = "user" }) => {
  const navigate = useNavigate();

  const user = {
    role: "user",
    signup_url: "/signup",
    userData: useSelector((state) => state.user.userData),
    userAuth: useSelector((state) => state.user.isUserAuth),
  };
  if (role === "admin") {
    user.role = "admin";
    user.signup_url = "/admin/signup";
    user.userData = useSelector((state) => state.admin.adminData);
    user.userAuth = useSelector((state) => state.admin.isAdminAuth);
  }
  
  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleCarClick = () => {
    navigate("/cars");
  };
  
  return (
    <>
      <section className="landingpage">
        <img
          className="landingpageImage"
          src={imgBackground}
          alt="background"
        />

        {user.userAuth ? (
          <div className="landingpageSearch">
            <h1>Welcome {user.userData?.username} !</h1>
            {user.role === "user" ? (
              <div>
                <h3>Start your journey here</h3>
                <CarSelector className="carSearch"/>
              </div>
            ) : (
              <div>
                <h4>Manage your fleet here</h4>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="landingpageText">
              <h4>Your trusted Rental Partner</h4>
              {user.role === "user" ? (
                <h1>Discover Your Ride</h1>
              ) : (
                <h1>Manage FlexiRide fleet and Members.</h1>
              )}
            </div>
          </>
        )}
        <div className="after"></div>
      </section>
      {user.role === "user" ? (
        <section className="landingpageContent">
          <section className="landingpageInfo">
            <h1>Change scenery, not standards.</h1>
            <p>
              Rent a car with FlexiRides and discover more of Kerala and India.
              Whether you crave a long holiday on the open road or love
              exploring city streets while on a business trip, we’re here to
              help. Book your FlexiRide car hire and go wherever the road may
              take you. Choose from a range of vehicles to find your perfect
              ride. Let’s go!
            </p>
            {user.userAuth ? (
              <button className="primary join" onClick={handleCarClick}>
                View all cars
              </button>
            ) : (
              <button className="primary join" onClick={handleSignupClick}>
                Join for free
              </button>
            )}
          </section>
          <section className="landingpageCars">
            <h1>View our fleet</h1>
            <p>
              When you rent a car from us, you always have a wide range to
              choose from. Maybe you are looking for an electric car, hybrid
              car, station wagon or an SUV. Or one of our larger options such as
              minibus or van.
            </p>
            <hr />
            <Carousel>
              <Carousel.Item interval={1000}>
                <div className="car">
                  <img className="carImage" src={suv} alt="SUV" />
                  <div>
                    <h3>4x4s and People Carriers</h3>
                    <p>
                      Are you going on a family vacation or planning your next
                      adventure? We have a wide selection of four-wheel drive
                      and SUV models that can accommodate the whole party and
                      all the luggage. Travel safely together with our reliable
                      four-wheel drive SUV.
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item interval={500}>
                <div className="car">
                  <img className="carImage" src={sedan} alt="sedan" />
                  <div>
                    <h3>Executive and Luxury Cars</h3>
                    <p>
                      Looking for a touch of elegance and comfort for your
                      business trip or special occasion? Our executive and
                      luxury sedans offer a smooth and stylish ride. Enjoy the
                      premium features and spacious interiors of our
                      top-of-the-line sedans.
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="car">
                  <img className="carImage" src={hatchback} alt="hatchback" />
                  <div>
                    <h3>Compact and City Cars</h3>
                    <p>
                      Navigating through city streets or looking for a compact
                      car for your daily commute? Our range of hatchbacks
                      provides the perfect blend of efficiency and convenience.
                      Ideal for urban driving, these cars are easy to park and
                      great on fuel.
                    </p>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="car">
                  <img className="carImage" src={electric} alt="electric" />
                  <div>
                    <h3>Eco-Friendly and Electric Vehicles</h3>
                    <p>
                      Want to make an eco-friendly choice without compromising
                      on performance? Our electric vehicles are perfect for the
                      environmentally conscious driver. Enjoy the benefits of
                      zero emissions and cutting-edge technology with our
                      electric car selection.
                    </p>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </section>
        </section>
      ) : (
        <section className="landingpageContent">
          {user.userAuth ? (
            <div className="adminActions">
              <div className="actionContainer" onClick={() => navigate("/admin/add/car")}>
                <h2>Add Car</h2>
                <CarTaxiFront size={48} />
              </div>
              {user.userData?.role === "admin" ? (
                <>
                  <div className="actionContainer" onClick={() => navigate("/admin/add/admin")}>
                    <h2>Add Dealer/Admin</h2>
                    <UserRoundCog size={48} />
                  </div>
                  <div className="actionContainer" onClick={() => navigate("/admin/add/member")}>
                    <h2>Add Member</h2>
                    <BookUser size={48} />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div>
              <h1>Please login to continue!</h1>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default LandingPage;
