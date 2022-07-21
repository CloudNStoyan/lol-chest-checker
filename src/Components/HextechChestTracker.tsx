import React, { useEffect, useState } from "react";
import { setChestEligibility } from "../store/leagueSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import HextechChestTrackerStyled from "./styles/HextechChestTracker.styled";

const HextechChestTracker = () => {
  const [currentClock, setCurrentClock] = useState("");
  const dispatch = useAppDispatch();
  const chestEligibility = useAppSelector(
    (state) => state.leagueReducer.chestEligibility
  );

  const formatNumber = (num: number) =>
    Math.floor(num).toFixed(0).padStart(2, "0");

  const updateClock = (nextRechargeTime: number) => {
    const now = new Date();

    if (isNaN(nextRechargeTime)) {
      setCurrentClock("00:00:00:00");
      return;
    }

    const seconds = ((now.getTime() - nextRechargeTime) / 1000) * -1;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    if (seconds < 5) {
      const newChestEligibility = Object.assign({}, chestEligibility);
      newChestEligibility.nextChestRechargeTime += 604800000;
      dispatch(setChestEligibility(newChestEligibility));
    }

    setCurrentClock(
      `${formatNumber(days)}:${formatNumber(hours % 24)}:${formatNumber(
        minutes % 60
      )}:${formatNumber(seconds % 60)}`
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => updateClock(chestEligibility?.nextChestRechargeTime),
      1000
    );
    return () => clearTimeout(timeoutId);
  }, [currentClock]);

  return (
    chestEligibility && (
      <HextechChestTrackerStyled>
        <div>
          {`${chestEligibility.earnableChests}/${chestEligibility.maximumChests} Chest Slots`}
        </div>
        <div>
          <h4>Next Chest</h4>
          <h4 className="clock">{currentClock}</h4>
        </div>
      </HextechChestTrackerStyled>
    )
  );
};

export default HextechChestTracker;
