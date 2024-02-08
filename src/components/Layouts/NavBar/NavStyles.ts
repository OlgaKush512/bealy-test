import { Box, Button, styled, Toolbar } from "@mui/material";

export const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export const NavBox = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  color: "theme.palette.primary.main",
});

export const styleLogoTextMd = {
  mr: 2,
  alignItems: "center",
  display: { xs: "none", sm: "block" },
  fontFamily: "Racing Sans One",
  fontWeight: 1000,
  letterSpacing: ".3rem",
  color: "secondary.main",
  textDecoration: "none",
  paddingLeft: "8px",
};

export const MyButton = styled(Button)(({ theme }) => {
  return {
    alignItems: "center",
    whiteSpace: "nowrap",
    marginLeft: 5,
    my: 2,
    color: theme.palette.primary.contrastText,
    disableElevation: "true",
  };
});
