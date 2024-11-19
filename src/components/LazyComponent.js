import React from "react";

const LazyComponent = () => {
  return (
    <div>
      <h2>This is a lazily-loaded component!</h2>
      <p>
        This component was not included in the initial bundle but was loaded
        dynamically when required.
      </p>
    </div>
  );
};

export default LazyComponent;
