import React from "react";
import logo from "../../images/lizzygram_icon_white_128x128.png";
import { Link } from "../Link";

export const Logo = () => {
  //console.log("[RENDER LOGO]", classes);
  return (
    <Link to="/">
      <img
        width={50}
        height={50}
        className="w-auto h-12"
        src={logo}
        alt="Lizzygram лого"
      />
    </Link>
  );
};
