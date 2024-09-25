import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemsPerPage } from "../slice/paginationSlice";

const InputLimit = () => {
  const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
  const [limitError, setLimitError] = useState(false);
  const dispatch = useDispatch();

  const limitHandle = (e) => {
    let value = e.target.value;

    if (value > 10) {
      setLimitError(true);
    } else {
      dispatch(setItemsPerPage(value));
      setLimitError(false);
    }
  };
  return (
    <div className="limitChangers">
      <input
        type="number"
        min={1}
        max={11}
        value={itemsPerPage}
        onChange={limitHandle}
      />
      <span className="text-red text-small">
        {limitError ? "Warning: enters input above 10 not allowed!" : ""}
      </span>
    </div>
  );
};

export default InputLimit;
