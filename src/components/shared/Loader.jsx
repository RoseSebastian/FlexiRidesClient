import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <RotatingLines
        strokeColor="#008009"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
        wrapperClass="wrapper-class"
      />
    </div>
  );
};

export default Loader;
