import React from "react";

const Spinner = ({ visible }) => {
  return (
    <div className={`c__spinner-wrapper--viewport ${visible ? `` : `d-none`}`}>
      <div className="c__spinner-parent">
        <svg className="c__spinner" viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="5"
          ></circle>
        </svg>
      </div>
    </div>
  );
};

export default Spinner;
