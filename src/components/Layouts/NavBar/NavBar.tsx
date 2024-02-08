import { MyButton, StyledToolBar } from "./NavStyles";
import Logo from "./Logo";
import { AppBar, Stack } from "@mui/material/index";
import { useState } from "react";
import LoginForm from "../../LoginForm/LoginForm";
import { useLocation, useParams } from "react-router-dom";

const NavBar = () => {
  const { username } = useParams();
  const location = useLocation();

  console.log("location.pathname", location.pathname);

  const [openRegistration, setOpenRegistration] = useState<boolean>(false);

  const handleLoginFormOpen = () => {
    setOpenRegistration(true);
  };

  const handleLoginFormClose = () => {
    setOpenRegistration(false);
  };

  return (
    <AppBar elevation={0} position="fixed">
      <StyledToolBar disableGutters>
        <Logo />
        <Stack
          direction="row"
          mr={4}
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {username ||
          location.pathname === "/login" ||
          location.pathname === "/chat" ? (
            <></>
          ) : (
            <>
              <MyButton variant="contained" onClick={handleLoginFormOpen}>
                Sign Up
              </MyButton>
              {openRegistration && <LoginForm onClose={handleLoginFormClose} />}
            </>
          )}
        </Stack>
      </StyledToolBar>
    </AppBar>
  );
};
export default NavBar;
