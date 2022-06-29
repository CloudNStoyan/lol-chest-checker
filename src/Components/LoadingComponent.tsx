import React, { useEffect } from "react";
import { setClientIsOpen } from "../store/configSlice";
import GetLCUCredentials from "../APIs/lcu-connector";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import LoadingComponentStyled from "./styles/LoadingComponent.styled";
import { setLcuCredentials } from "../store/leagueSlice";

const LoadingComponent = () => {
  const dispatch = useAppDispatch();
  const { config } = useAppSelector((state) => state.configReducer);

  useEffect(() => {
    const cred = GetLCUCredentials(config.pathToLeagueOfLegends);
    if (!cred) {
      return;
    }

    dispatch(setLcuCredentials(cred));
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
