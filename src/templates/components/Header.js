import React from "react";
import "./Header.css";
import FilipizenIcon from "../../assets/FilipizenIcon";

const Header = ({ style }) => {
  return (
    <header className="Header" style={style}>
      <FilipizenIcon className="Header__icon" />
    </header>
  );
};

export default Header;
