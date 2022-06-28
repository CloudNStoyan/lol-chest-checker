import React, { FunctionComponent, useEffect, useState } from "react";
import { setFilterInput, setShowEarned } from "../store/leagueSlice";
import { useAppDispatch } from "../store/hooks";

const ChampionsResultFilters: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [hideEarned, setHideEarned] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(setFilterInput(filter));
  }, [filter]);

  useEffect(() => {
    dispatch(setShowEarned(!hideEarned));
  }, [hideEarned]);

  return (
    <>
      <input
        placeholder="Champion name.."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
      />
      <div className="filter-chest-granted">
        <label htmlFor="filterChestGranted">Exclude Earned</label>
        <input
          checked={!hideEarned}
          onChange={(e) => setHideEarned(!e.target.checked)}
          id="filterChestGranted"
          type="checkbox"
        />
      </div>
    </>
  );
};

export default ChampionsResultFilters;
