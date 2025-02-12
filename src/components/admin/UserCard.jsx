import React from "react";
import Card from "react-bootstrap/Card";
import "../../styles/admin/UserCard.css"

const UserCard = (props) => {
  const member = props.member ? props.member : props.dealer;

  return (
    <Card>
      <Card.Body>
        <div className="userContainer">
          <div className="userDetails">
            <div className="primaryText">{member.username}</div>
            <div className="largeText">{member.email}</div>
            <div className="mediumText">{member.phone}</div>
            <div className="smallText">{member.address}</div>
          </div>
          <div className="userActions">
            {member.role === 'user' ? <div className="userRole">MEMBER</div> : <div className="userRole">{member.role}</div>}
            {(member.role === "dealer" || member.role === "user") && (
              <>
                <button className="secondary">Edit</button>
                {member.isActive ? <button className="cancel">Deactivate</button> : <button className="secondary">Activate</button>}
              </>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default UserCard;
