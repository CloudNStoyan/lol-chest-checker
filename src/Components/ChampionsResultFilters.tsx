import React, { FunctionComponent } from "react";

export type ChampionsResultFiltersProps = {
  filterInput: string;
  setFilterInput: React.Dispatch<React.SetStateAction<string>>;
  showEarned: boolean;
  setShowEarned: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChampionsResultFilters: FunctionComponent<
  ChampionsResultFiltersProps
> = ({ filterInput, setFilterInput, showEarned, setShowEarned }) => {
  return (
    <>
      <input
        placeholder="Champion name.."
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        className="filter-input"
      />
      <div className="filter-chest-granted">
        <label htmlFor="filterChestGranted">Exclude Earned</label>
        <input
          checked={showEarned}
          onChange={(e) => setShowEarned(e.target.checked)}
          id="filterChestGranted"
          type="checkbox"
        />
      </div>
    </>
  );
};

export default ChampionsResultFilters;
