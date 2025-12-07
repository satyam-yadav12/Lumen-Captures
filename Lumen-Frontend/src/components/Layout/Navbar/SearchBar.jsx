import React from "react";

const SearchBar = () => {
  const SearchKeyword = () => {
    console.log("search hit");
  };
  return (
    <div className="w-full flex flex-col justify-start m-auto">
      <div className="relative w-[90%] mx-0 sm:w-full overflow-visible">
        <input
          type="text"
          name="Search"
          placeholder="Search Image Tag/Title"
          className="border inline border-gray-400 border-r-0 p-4  rounded-r-none rounded-3xl mx-0 md:mt-2 bg-gray-100 h-[50px] text-black focus:outline-0 w-[90%]"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
          alt="Q"
          className="border border-gray-400 border-l-0 p-3 absolute h-[50px] rounded-r-3xl inline mx-0 md:mt-2 outline-0  bg-gray-100 w-max"
          onClick={SearchKeyword}
        />
      </div>
      <div className="mt-1">
        <label
          htmlFor="source"
          className="mx-2  font-extralight  font-sans text-sm"
        >
          <input
            type="checkbox"
            name="source"
            id="source"
            className="p-2 cursor-pointer md:pl-0 md:ml-0"
            defaultChecked
          />{" "}
          Search Lumen Dataset
        </label>
        <label
          htmlFor="user"
          className="mx-2  font-extralight  font-sans text-sm"
        >
          <input
            type="checkbox"
            name="user"
            id="user"
            className="p-2 cursor-pointer"
          />{" "}
          Search User
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
