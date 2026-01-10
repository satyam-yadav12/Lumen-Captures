import { Chip } from "@mui/material";
import React, { useState } from "react";

const FilterChips = ({ data = ["Lumen Captures"], isFilterApplied, setIsFilterApplied}) => {
  const [variant, setVariant] = useState(0);

  const filterApply = ((e) => {
    setVariant(!variant)
    setIsFilterApplied(!isFilterApplied)
    
  });

  return (
    <div className="flex flex-row gap-3 m-5 md:m-3  justify-start items-cetner ">
      {data.map((val, index) => {
        return (
          <span key={val} className="w-max p-0 m-0">
            <p
              id={val}
              onClick={filterApply}
              className={variant ? `p-1 pt-0.5 text-[16px]  font-normal text-center align-middle px-3 cursor-pointer rounded-2xl border bg-blue-500 text-white  border-blue-700 w-max` :`p-1 pt-0.5 text-[16px]  font-normal text-center align-middle px-3 cursor-pointer rounded-2xl border bg-white text-blue-500  border-blue-500 w-max`}
            >
              {val}
            </p>
          </span>
        );
      })}
    </div>
  );
};

export default FilterChips;
