import React from "react";
import imgBackground from "../assets/flexi_background.jpg";
import suv from "../assets/suv.png";
import sedan from "../assets/sedan.png";
import hatchback from "../assets/hatchback.png";
import electric from "../assets/electric.png";
import "../styles/landingPage.css";
import Carousel from 'react-bootstrap/Carousel';

export function LandingPage(props) {
  return (
    <>
      <section className="landingpage">
        <img
          className="landingpageImage"
          src={imgBackground}
          alt="background"
        />
        <div className="landingpageText">
          <h4>Your trusted Rental Partner</h4>
          <h1>Discover Your Ride</h1>
        </div>
      </section>
      <section className="landingpageContent">
        <section className="landingpageInfo">
          <h1>Change scenery, not standards.</h1>
          <p>
            Rent a car with FlexiRides and discover more of Kerala and India.
            Whether you crave a long holiday on the open road or love exploring
            city streets while on a business trip, we’re here to help. Book your
            FlexiRide car hire and go wherever the road may take you. Choose
            from a range of vehicles to find your perfect ride. Let’s go!
          </p>
         
          {/* <div className="counts">
            <div className="count">
              <h1 className="countText">12</h1>
              <h4 className="countLabel">Members</h4>
            </div>
            <div className="vertical-line"></div>
            <div className="count">
              <h1 className="countText">42</h1>
              <h4 className="countLabel">Rides</h4>
            </div>
          </div> */}
          <button className="primary join">Join for free</button>
        </section>
        <section className="landingpageCars">
          <h1>View our fleet</h1>
          <p>
            When you rent a car from us, you always have a wide range to choose
            from. Maybe you are looking for an electric car, hybrid car, station
            wagon or an SUV. Or one of our larger options such as minibus or
            van.
          </p>
          <hr />
          <Carousel>
            <Carousel.Item interval={1000}>
              <div className="car">
                <img
                  className="carImage"
                  src={suv}
                  alt="SUV"
                />
                <div>
                    <h3>4x4s and People Carriers</h3>
                    <p>Are you going on a family vacation or planning your next adventure? We have a wide selection of four-wheel drive and SUV models that can accommodate the whole party and all the luggage. Travel safely together with our reliable four-wheel drive SUV.</p>
                </div>
              </div>              
            </Carousel.Item>
            <Carousel.Item interval={500}>              
            <div className="car">
                <img
                  className="carImage"
                  src={sedan}
                  alt="sedan"
                />
                <div>
                    <h3>Executive and Luxury Cars</h3>
                    <p>Looking for a touch of elegance and comfort for your business trip or special occasion? Our executive and luxury sedans offer a smooth and stylish ride. Enjoy the premium features and spacious interiors of our top-of-the-line sedans.</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>              
            <div className="car">
                <img
                  className="carImage"
                  src={hatchback}
                  alt="hatchback"
                />
                <div>
                    <h3>Compact and City Cars</h3>
                    <p>Navigating through city streets or looking for a compact car for your daily commute? Our range of hatchbacks provides the perfect blend of efficiency and convenience. Ideal for urban driving, these cars are easy to park and great on fuel.</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>              
            <div className="car">
                <img
                  className="carImage"
                  src={electric}
                  alt="electric"
                />
                <div>
                    <h3>Eco-Friendly and Electric Vehicles</h3>
                    <p>Want to make an eco-friendly choice without compromising on performance? Our electric vehicles are perfect for the environmentally conscious driver. Enjoy the benefits of zero emissions and cutting-edge technology with our electric car selection.</p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </section>
      </section>
    </>
  );
}
