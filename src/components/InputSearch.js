import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../slice/inputSearchSlice";

const InputSearch = () => {
  const searchText = useSelector((state) => state.inputSearch.searchText);
  const dispatch = useDispatch();

  const onChangeSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchText(value));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        dispatch(setSearchText(searchText));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchText, dispatch]);
  return (
    <span className="input-box">
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={onChangeSearch}
      />
      <button className="btn-search">Ctrl + /</button>
    </span>
  );
};

export default InputSearch;
