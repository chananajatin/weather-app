import { Skeleton , Button } from "antd";
const Shimmer = () => {
  return (
    <div className="body-container">
      <Skeleton.Input
        style={{
          margin: "50px",
          height: "600px",
          width: "500px",
          borderRadius: "20px",
        }}
        active
      />
    </div>
  );
};


export default Shimmer;