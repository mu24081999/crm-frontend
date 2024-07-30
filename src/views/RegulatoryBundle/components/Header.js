import React from "react";

const Header = ({ onDataFromChild, activeBar }) => {
  return (
    <header className="contact-header">
      <div className="d-flex align-items-center">
        <span className="fs-5 fw-bold">Regulatory Bundles</span>
      </div>
    </header>
  );
};

export default Header;
