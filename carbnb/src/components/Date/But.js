import React from "react";

const But = ({ children, onClick, ...Props }) => {
  return (
    <div>
      <button className="btn btn-primary" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
export default But;
