import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
const Header = () => {
  return (
    <section className="get_started_header">
      <img className="get_started_logo" src="/LYC-primary.svg" alt="logo" />
      <h2 className="">Love Your City</h2>
      <MenuIcon
          style={{
            color: "rgba(255, 255, 255, 1)",
            width: "24px",
            hieght: "186px",
            marginTop: "8px",
            display: "flex",
            marginLeft: "auto",
            marginRight: "6px",
          }}
        />
    </section>
  );
};

export default Header;
