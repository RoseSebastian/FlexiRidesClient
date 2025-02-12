import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { RotatingLines } from "react-loader-spinner";
import { Col, Row } from "react-bootstrap";
import UserCard from "../../components/admin/UserCard";

const Users = (props) => {
  const [members, setMembers] = useState();
  const [isLoadingMember, setIsLoadingMember] = useState(true);
  const [errorMember, setErrorMember] = useState(null);
  const [dealers, setDealers] = useState();
  const [isLoadingDealer, setIsLoadingDealer] = useState(true);
  const [errorDealer, setErrorDealer] = useState(null);

  const fetchMembers = async () => {
    setIsLoadingMember(true);
        try {
          const response = await axiosInstance({
            method: "GET",
            url: "/user/allUsers",
          });
          const data = response.data;
          setMembers(data);          
          setIsLoadingMember(false);
          setErrorMember(null);
        } catch (error) {
          setErrorMember(error.response.data.message);
          setIsLoadingMember(false);
        }
  }

  const fetchDealers = async () => {
    setIsLoadingDealer(true);
        try {
          const response = await axiosInstance({
            method: "GET",
            url: "/admin/allAdmins",
          });
          const data = response.data;
          setDealers(data);          
          setIsLoadingDealer(false);
          setErrorDealer(null);
        } catch (error) {
          setErrorDealer(error.response.data.message);
          setIsLoadingDealer(false);
        }
  }

  useEffect(() => {
    fetchMembers();
    fetchDealers();
  }, []);

  return (
    <div className="appContainer">
      <Tabs defaultActiveKey="members" className="mb-3">
        <Tab eventKey="members" title="Members">
        {isLoadingMember ? (
          <RotatingLines
            strokeColor="#008009"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
            wrapperClass="wrapper-class"
          />
        ) : (
          <div className="">
            <section>
              <Row>
                {members?.map((member, index) => (
                  <Col xs={12} sm={6} xxl={6} key={member?._id} className="my-2">
                    <UserCard member={member} />
                  </Col>
                ))}
              </Row>

              {members?.length === 0 && (
                <div className="d-flex flex-column justify-content-center m-5">
                  <h3>No Members</h3>
                </div>
              )}
              {errorMember && (
                <div className="d-flex justify-content-center m-5">
                  <h2>Something went wrong!</h2>
                  <h5>Try again.</h5>
                </div>
              )}
            </section>
          </div>
        )}
        </Tab>
        <Tab eventKey="admin" title="Admin/Dealer">
        {isLoadingDealer ? (
          <RotatingLines
            strokeColor="#008009"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
            wrapperClass="wrapper-class"
          />
        ) : (
          <div className="">
            <section>
              <Row>
                {dealers?.map((dealer, index) => (
                  <Col xs={12} sm={6} xxl={6} key={dealer?._id} className="my-2">
                    <UserCard dealer={dealer} />
                  </Col>
                ))}
              </Row>

              {dealers?.length === 0 && (
                <div className="d-flex flex-column justify-content-center m-5">
                  <h3>No Admins/Dealers</h3>
                </div>
              )}
              {errorDealer && (
                <div className="d-flex justify-content-center m-5">
                  <h2>Something went wrong!</h2>
                  <h5>Try again.</h5>
                </div>
              )}
            </section>
          </div>
        )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Users;
