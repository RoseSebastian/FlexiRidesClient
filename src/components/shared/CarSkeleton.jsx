import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import carImg from "../../assets/carImg.jpg";

const CarSkeleton = (props) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={carImg} />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>          
        </Card.Body>
      </Card>
    </>
  );
}
export default CarSkeleton;