import React, { FunctionComponent, useEffect, useState } from "react";
import {
  FilterBrowseData,
  setBrowseChampDataFilter,
} from "../store/leagueSlice";
import { useAppDispatch } from "../store/hooks";

const initialFilter: FilterBrowseData = {
  filter: "",
  showEarned: true,
};

const ChampionsResultFilters: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    dispatch(setBrowseChampDataFilter(filter));
  }, [filter]);

  return (
    <>
      <input
        placeholder="Champion name.."
        value={filter.filter}
        onChange={(e) => setFilter({ ...filter, filter: e.target.value })}
        className="filter-input"
      />
      <div className="filter-chest-granted">
        <label htmlFor="filterChestGranted">Exclude Earned</label>
        <input
          checked={filter.showEarned}
          onChange={(e) => {
            setFilter({ ...filter, showEarned: e.target.checked });
          }}
          id="filterChestGranted"
          type="checkbox"
        />
      </div>
    </>
  );
};

export default ChampionsResultFilters;
