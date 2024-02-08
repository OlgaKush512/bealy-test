import { Typography } from "@mui/material";
import { NavBox, styleLogoTextMd } from "./NavStyles";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo50.png";

const Logo = () => {
  return (
    <NavBox flex={1} p={1}>
      <NavLink to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
        <img src={logo} alt="logo" width={80} />
      </NavLink>
      <NavLink
        to={"/"}
        style={{ textDecoration: "none", color: "inherit" }}
      ></NavLink>
      <NavLink to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h6" noWrap sx={styleLogoTextMd}>
          Bealy Test
        </Typography>
      </NavLink>
    </NavBox>
  );
};

export default Logo;
