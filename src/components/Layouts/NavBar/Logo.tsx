import { Typography } from "@mui/material";
import { NavBox, styleLogoTextMd } from "./NavStyles";

const Logo = () => {
  return (
    <NavBox flex={1} p={1}>
      <img src="src/assets/logo50.png" alt="logo" width={80} />
      <Typography variant="h6" noWrap sx={styleLogoTextMd}>
        Bealy Test
      </Typography>
    </NavBox>
  );
};

export default Logo;
