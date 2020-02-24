import React from "react";

function Images({ children }) {
  return (
    <div style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}>
      <h1>Try to remember</h1>
      {children}
    </div>
  );
}

export default Images;