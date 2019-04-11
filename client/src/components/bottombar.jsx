import React from "react";

const Bar = ({ text, onClickFunction }) =>
  <div id="bar">
    Results
    <pre>
      {text}
    </pre>
    <button
      id='runFilterButton'
      onClick={onClickFunction}
    >
      Run Filter
    </button>
  </div>

export default Bar;
