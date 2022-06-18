import React from "react";
import LoadingComponentStyled from "./LoadingComponent.styled";

const LoadingComponent = () => {
  return (
    <LoadingComponentStyled>
      Please start the League Client first and restart the app or{" "}
      <a href="#" onClick={() => location.reload()}>
        click here
      </a>
      .
    </LoadingComponentStyled>
  );
};

export default LoadingComponent;
