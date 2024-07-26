import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import {
  FaChevronDown,
  FaChevronUp,
  FaList,
  FaRecycle,
  FaRegIdCard,
} from "react-icons/fa";

const Header = ({ onDataFromChild, activeBar }) => {
  return (
    <header className="contact-header border px-2 pt-4 pb-3">
      <div className="d-flex align-items-center">
        <span className="fs-5 fw-bold">A2P Registration Requests</span>
      </div>
    </header>
  );
};

export default Header;
