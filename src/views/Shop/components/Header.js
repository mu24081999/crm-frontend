import React from "react";

const Header = () => {
  return (
    <header className="contact-header">
      <div className="d-flex align-items-center">
        <div className="dropdown">
          <a
            className="contactapp-title dropdown-toggle link-dark"
            data-bs-toggle="dropdown"
            href="/"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <h1>Available Phone Numbers</h1>
          </a>
        </div>
      </div>
      <div className="hk-sidebar-togglable"></div>
    </header>
  );
};

export default Header;
