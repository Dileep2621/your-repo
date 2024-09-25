import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../slice/paginationSlice";

const Pagination = ({ ...props }) => {
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const dispatch = useDispatch();

  const getPaginationGroup = () => {
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(props.totalPages - 1, currentPage + 1);

    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < props.totalPages - 2) {
      pages.push("...");
    }

    if (props.totalPages > 1) {
      pages.push(props.totalPages);
    }

    return pages;
  };

  const paginationBar = getPaginationGroup().map((page, index) => {
    if (page === currentPage) {
      return (
        <button
          key={index}
          disabled={currentPage === page}
          className="xs-hidden sm-show pageButton"
        >
          {page}
        </button>
      );
    } else {
      return (
        <button
          key={index}
          onClick={() => handlePagination(page)}
          className="xs-hidden sm-show pageButton"
        >
          {page}
        </button>
      );
    }
  });

  const handlePagination = (n) => {
    dispatch(setCurrentPage(n));
  };

  return (
    <div className="paginationData">
      <button
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
        className="prevNext"
      >
        Prev
      </button>
      {paginationBar}
      <button
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === props.totalPages}
        className="prevNext"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
