import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import "../../styles/admin/UserCard.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import Image from "react-bootstrap/Image";
import profileIcon from "../../assets/profile-icon.png";

const UserCard = (props) => {
  const [member, setMember] = useState(props.member || props.dealer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setMember(props.member || props.dealer);
  }, [props.member, props.dealer]);

  const handleUserStatus = async () => {
    const url =
      member.role === "user"
        ? `/admin/userStatus/${member._id}`
        : `/admin/adminStatus/${member._id}`;
    
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: url,
      });
      const newMember = response.data;
      setMember(prev  =>({
        ...prev ,
        isActive: newMember?.isActive
      }));
      
    } catch (error) {      
      
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = () => {
    const isMember = member?.role === 'user' ? true : false;
    navigate(`/admin/users/${member?._id}/${isMember}`);
  }

  return (
    <Card className="userCard">
      <Card.Body>
        <div className="userContainer">
          <div>
          <Image
                src={member?.profilePic ?? profileIcon}
                roundedCircle
                className="profileIcon"
              />
          </div>
          <div className="userDetails">
            <div className="primaryText">{member?.username}</div>
            <div className="largeText">{member?.email}</div>
            <div className="mediumText">{member?.phone}</div>
            <div className="smallText">{member?.address}</div>
          </div>
          <div className="userActions">
            {member?.role === "user" ? (
              <div className="userRole">MEMBER</div>
            ) : (
              <div className="userRole">{member?.role}</div>
            )}
            {(member?.role === "dealer" || member?.role === "user") && (
              <>
                <button className="secondary" onClick={handleEdit}>Edit</button>
                {member?.isActive ? (
                  <button className="cancel" onClick={handleUserStatus}>
                    Deactivate
                  </button>
                ) : (
                  <button className="secondary" onClick={handleUserStatus}>
                    Activate
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default UserCard;
