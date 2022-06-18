import React from "react";

const LoadingComponent = () => {
  return (
    <div>
      Please start the League Client first and restart the app or{" "}
      <a href="#" onClick={() => location.reload()}>
        click here
      </a>
      .
    </div>
  );
};

export default LoadingComponent;
