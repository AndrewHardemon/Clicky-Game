import React from "react";
import "./style.css";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center", backgroundColor: "darkgrey", color: "blue", border: "5px ridge black"}}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
