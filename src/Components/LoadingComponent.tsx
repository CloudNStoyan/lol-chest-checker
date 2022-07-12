import React, { useEffect } from "react";
import { setClientIsOpen } from "../store/configSlice";
import GetLCUCredentials from "../APIs/lcu-connector";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import LoadingComponentStyled from "./styles/LoadingComponent.styled";
import { SetCredentials } from "../APIs/lcu-client";

const LoadingComponent = () => {
  const dispatch = useAppDispatch();
  const { config } = useAppSelector((state) => state.configReducer);

  useEffect(() => {
    const cred = GetLCUCredentials(config.pathToLeagueOfLegends);
    if (!cred) {
      return;
    }

    SetCredentials(cred);
    dispatch(setClientIsOpen(true));
  }, [config]);

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
