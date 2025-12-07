import { Chip } from "@mui/material";
import React, { useState } from "react";

const FilterChips = ({ data = ["hello", "apply", "some", "filter"] }) => {
  const [variant, setVariant] = useState("outlined");

  const filterApply = (e) => setVariant(e.target.id);

  return (
    <div className="flex flex-row gap-3 m-5 md:m-3  justify-start items-cetner ">
      {data.map((val, index) => {
        return (
          <span key={val} className="w-max p-0 m-0">
            <p
              id={val}
              onClick={filterApply}
              className="p-1 pt-0.5 text-[14px] bg-white font-normal text-center align-middle px-3 cursor-pointer rounded-2xl text-blue-500 border border-blue-500 w-max"
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
