import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center">
      <div className="spinner-border text-primary" role="status">
        <span className="spinner-grow spinner-grow-sm"></span>
      </div>
    </div>
  );
};

export default Spinner;
