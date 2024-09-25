import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemsPerPage } from "../slice/paginationSlice";

const SelectLimit = ({ ...props }) => {
  const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    let value = e.target.value;

    if (value > 0) {
      dispatch(setItemsPerPage(value));
    }
  };

  return (
    <span className="select-box">
      <select value={itemsPerPage} onChange={handleSelect}>
        <option value="">--Please select option--</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </span>
  );
};

export default SelectLimit;
