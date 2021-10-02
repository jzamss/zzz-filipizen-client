import React from "react";
import "./LguHeader.css";
import { AppBar } from "zzz-react-components";
import { Link } from "react-router-dom";

const LguHeader = ({ partner }) => {
  return (
    <AppBar>
      <header className="LguHeader">
        {partner.id && (
          <Link
            to={{
              pathname: `/partners/${partner.group.name}_${partner.name}`,
              state: { partner: partner },
            }}
          >
            <img
              className="LguHeader__icon"
              src={`/assets/${partner.id}.png`}
              alt="Lgu"
            />
          </Link>
        )}
        <label className="LguHeader__lgu">{partner.title}</label>
      </header>
    </AppBar>
  );
};

export default LguHeader;
